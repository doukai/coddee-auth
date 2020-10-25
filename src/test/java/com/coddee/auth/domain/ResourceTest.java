package com.coddee.auth.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.coddee.auth.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class ResourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Resource.class);
        Resource resource1 = new Resource();
        resource1.setId(1L);
        Resource resource2 = new Resource();
        resource2.setId(resource1.getId());
        assertThat(resource1).isEqualTo(resource2);
        resource2.setId(2L);
        assertThat(resource1).isNotEqualTo(resource2);
        resource1.setId(null);
        assertThat(resource1).isNotEqualTo(resource2);
    }
}
