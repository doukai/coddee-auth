package com.coddee.auth.security.casbin;

import static com.coddee.auth.security.casbin.CasbinProperties.USER_PREFIX;

import java.util.Collection;
import java.util.List;
import java.util.Locale;
import org.casbin.jcasbin.main.Enforcer;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

public class CasbinAccessDecisionManager implements AccessDecisionManager {
    private final Enforcer enforcer;

    private PathMatcher delegate = new AntPathMatcher();

    public CasbinAccessDecisionManager(Enforcer enforcer) {
        this.enforcer = enforcer;
    }

    @Override
    public void decide(Authentication auth, Object object, Collection<ConfigAttribute> collection)
        throws AccessDeniedException, InsufficientAuthenticationException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ConfigAttribute> attributes = (List<ConfigAttribute>) collection;
        if (attributes.size() != 2) {
            throw new AccessDeniedException("You don't have access to " + object + "!");
        }
        String requestUrl = attributes.get(0).getAttribute();

        if (delegate.match("/api/authenticate", requestUrl)) {
            return;
        }

        if (delegate.match("/api/account", requestUrl)) {
            return;
        }

        if (!delegate.match("/api/**", requestUrl)) {
            return;
        }

        String requestMethod = attributes.get(1).getAttribute();
        if (enforcer.enforce(USER_PREFIX + username.toLowerCase(Locale.ENGLISH), "Representative", requestUrl, requestMethod)) {
            return;
        }

        throw new AccessDeniedException("You don't have access to " + object + "!");
    }

    @Override
    public boolean supports(ConfigAttribute configAttribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}
