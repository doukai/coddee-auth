package com.coddee.auth.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.coddee.auth.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class TenantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tenant.class);
        Tenant tenant1 = new Tenant();
        tenant1.setId(1L);
        Tenant tenant2 = new Tenant();
        tenant2.setId(tenant1.getId());
        assertThat(tenant1).isEqualTo(tenant2);
        tenant2.setId(2L);
        assertThat(tenant1).isNotEqualTo(tenant2);
        tenant1.setId(null);
        assertThat(tenant1).isNotEqualTo(tenant2);
    }
}
