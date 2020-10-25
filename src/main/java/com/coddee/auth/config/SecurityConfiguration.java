package com.coddee.auth.config;

import com.coddee.auth.repository.RoleRepository;
import com.coddee.auth.security.*;
import com.coddee.auth.security.casbin.CasbinAccessDecisionManager;
import com.coddee.auth.security.casbin.CasbinProperties;
import com.coddee.auth.security.casbin.CasbinRBACAdapter;
import com.coddee.auth.security.casbin.CasbinSecurityMetadataSource;
import com.coddee.auth.security.jwt.*;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import lombok.Cleanup;
import lombok.SneakyThrows;
import org.casbin.jcasbin.main.Enforcer;
import org.casbin.jcasbin.main.SyncedEnforcer;
import org.casbin.jcasbin.model.Model;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.util.ResourceUtils;
import org.springframework.web.filter.CorsFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;

    private final CorsFilter corsFilter;
    private final SecurityProblemSupport problemSupport;

    private final CasbinProperties casbinProperties;

    private final RoleRepository roleRepository;

    public SecurityConfiguration(
        TokenProvider tokenProvider,
        CorsFilter corsFilter,
        SecurityProblemSupport problemSupport,
        CasbinProperties casbinProperties,
        RoleRepository roleRepository
    ) {
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.problemSupport = problemSupport;
        this.casbinProperties = casbinProperties;
        this.roleRepository = roleRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web
            .ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/app/**/*.{js,html}")
            .antMatchers("/i18n/**")
            .antMatchers("/content/**")
            .antMatchers("/h2-console/**")
            .antMatchers("/swagger-ui/index.html")
            .antMatchers("/test/**");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        if (casbinProperties.isEnabled()) {
            // @formatter:off
            http
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                .withObjectPostProcessor(
                    new ObjectPostProcessor<FilterSecurityInterceptor>() {
                        @SneakyThrows
                        @Override
                        public <O extends FilterSecurityInterceptor> O postProcess(O object) {
                            object.setSecurityMetadataSource(getCasbinSecurityMetadataSource());
                            object.setAccessDecisionManager(getCasbinAccessDecisionManager());
                            return object;
                        }
                    }
                )
                .and()
                .csrf()
                .disable()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(problemSupport)
                .accessDeniedHandler(problemSupport)
                .and()
                .headers()
                .contentSecurityPolicy("default-src 'self'; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:")
                .and()
                .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                .and()
                .featurePolicy("geolocation 'none'; midi 'none'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; fullscreen 'self'; payment 'none'")
                .and()
                .frameOptions()
                .deny()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeRequests()
//                .antMatchers("/").permitAll()
//                .antMatchers("/api/authenticate").permitAll()
//                .antMatchers("/api/**").authenticated()
//                .antMatchers("/websocket/tracker").hasAuthority(AuthoritiesConstants.ADMIN)
//                .antMatchers("/websocket/**").permitAll()
//                .antMatchers("/management/health").permitAll()
//                .antMatchers("/management/info").permitAll()
//                .antMatchers("/management/prometheus").permitAll()
//                .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
//                .and()
//                .httpBasic()
                .and()
                .apply(securityConfigurerAdapter());
            // @formatter:on

        }
    }

    @Bean
    public CasbinSecurityMetadataSource getCasbinSecurityMetadataSource() {
        return new CasbinSecurityMetadataSource();
    }

    @Bean
    public CasbinAccessDecisionManager getCasbinAccessDecisionManager() throws IOException {
        return new CasbinAccessDecisionManager(getEnforcer());
    }

    @Bean
    public CasbinRBACAdapter getCasbinRBACAdapter() {
        return new CasbinRBACAdapter(roleRepository);
    }

    @Bean
    public Enforcer getEnforcer() throws IOException {
        Model model = new Model();
        String modelPath = new ClassPathResource(casbinProperties.getModel()).exists()
            ? casbinProperties.getModel()
            : "classpath:config/casbin/model_request.conf";
        @Cleanup
        InputStream is = ResourceUtils.getURL(modelPath).openStream();
        StringBuilder sb = new StringBuilder();
        byte[] buf = new byte[100];
        int len;
        while ((len = is.read(buf)) != -1) {
            sb.append(new String(buf, 0, len, Charset.defaultCharset()));
        }
        model.loadModelFromText(sb.toString());

        Enforcer enforcer;

        if (casbinProperties.getSynced()) {
            enforcer = new SyncedEnforcer(model, getCasbinRBACAdapter());
        } else {
            enforcer = new Enforcer(model, getCasbinRBACAdapter());
        }

        return enforcer;
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}
