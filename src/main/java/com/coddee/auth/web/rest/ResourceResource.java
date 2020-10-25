package com.coddee.auth.web.rest;

import com.coddee.auth.domain.Resource;
import com.coddee.auth.repository.ResourceRepository;
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
 * REST controller for managing {@link com.coddee.auth.domain.Resource}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ResourceResource {
    private final Logger log = LoggerFactory.getLogger(ResourceResource.class);

    private final ResourceRepository resourceRepository;

    public ResourceResource(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    /**
     * {@code GET  /resources} : get all the resources.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of resources in body.
     */
    @GetMapping("/resources")
    public ResponseEntity<List<Resource>> getAllResources(Pageable pageable) {
        log.debug("REST request to get a page of Resources");
        Page<Resource> page = resourceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /resources/:id} : get the "id" resource.
     *
     * @param id the id of the resource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the resource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/resources/{id}")
    public ResponseEntity<Resource> getResource(@PathVariable Long id) {
        log.debug("REST request to get Resource : {}", id);
        Optional<Resource> resource = resourceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(resource);
    }
}
