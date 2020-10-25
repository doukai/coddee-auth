package com.coddee.auth.security.casbin;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties(CasbinProperties.PREFIX)
@Component
public class CasbinProperties {
    public static final String PREFIX = "spring-security-jcasbin";

    public static final String USER_PREFIX = "U::";

    public static final String ROLE_PREFIX = "R::";

    public static final String P_TYPE = "p";

    public static final String G_TYPE = "g";

    private boolean enabled = true;

    private String model = "classpath:casbin/model_request.conf";

    private String ruleTable = "casbin_rule";

    private Boolean synced = false;
}
