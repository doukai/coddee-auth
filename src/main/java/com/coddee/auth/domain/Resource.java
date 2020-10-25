package com.coddee.auth.domain;

import com.coddee.auth.domain.enumeration.MethodType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Resource.
 */
@Entity
@Table(name = "resource")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Resource implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "url", nullable = false)
    private String url;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "method", nullable = false)
    private MethodType method;

    @NotNull
    @Column(name = "resource_name", nullable = false)
    private String resourceName;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "resources", allowSetters = true)
    private Tenant tenant;

    @ManyToMany(mappedBy = "resources")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Resource url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public MethodType getMethod() {
        return method;
    }

    public Resource method(MethodType method) {
        this.method = method;
        return this;
    }

    public void setMethod(MethodType method) {
        this.method = method;
    }

    public String getResourceName() {
        return resourceName;
    }

    public Resource resourceName(String resourceName) {
        this.resourceName = resourceName;
        return this;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public Resource tenant(Tenant tenant) {
        this.tenant = tenant;
        return this;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Resource roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Resource addRole(Role role) {
        this.roles.add(role);
        role.getResources().add(this);
        return this;
    }

    public Resource removeRole(Role role) {
        this.roles.remove(role);
        role.getResources().remove(this);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Resource)) {
            return false;
        }
        return id != null && id.equals(((Resource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Resource{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", method='" + getMethod() + "'" +
            ", resourceName='" + getResourceName() + "'" +
            "}";
    }
}
