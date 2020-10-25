package com.coddee.auth.web.rest;

import com.coddee.auth.domain.Tenant;
import com.coddee.auth.repository.TenantRepository;
import com.coddee.auth.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing {@link com.coddee.auth.domain.Tenant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TenantResource {
    private final Logger log = LoggerFactory.getLogger(TenantResource.class);

    private final TenantRepository tenantRepository;

    public TenantResource(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    /**
     * {@code GET  /tenants} : get all the tenants.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tenants in body.
     */
    @GetMapping("/tenants")
    public ResponseEntity<List<Tenant>> getAllTenants(Pageable pageable) {
        log.debug("REST request to get a page of Tenants");
        Page<Tenant> page = tenantRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tenants/:id} : get the "id" tenant.
     *
     * @param id the id of the tenant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tenant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tenants/{id}")
    public ResponseEntity<Tenant> getTenant(@PathVariable Long id) {
        log.debug("REST request to get Tenant : {}", id);
        Optional<Tenant> tenant = tenantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tenant);
    }
}
