import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './role.reducer';
import { IRole } from 'app/shared/model/role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RoleDetail = (props: IRoleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { roleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coddeeApp.role.detail.title">Role</Translate> [<b>{roleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="roleCode">
              <Translate contentKey="coddeeApp.role.roleCode">Role Code</Translate>
            </span>
          </dt>
          <dd>{roleEntity.roleCode}</dd>
          <dt>
            <span id="roleName">
              <Translate contentKey="coddeeApp.role.roleName">Role Name</Translate>
            </span>
          </dt>
          <dd>{roleEntity.roleName}</dd>
          <dt>
            <Translate contentKey="coddeeApp.role.user">User</Translate>
          </dt>
          <dd>
            {roleEntity.users
              ? roleEntity.users.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.login}</a>
                    {roleEntity.users && i === roleEntity.users.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}{' '}
          </dd>
          <dt>
            <Translate contentKey="coddeeApp.role.resource">Resource</Translate>
          </dt>
          <dd>
            {roleEntity.resources
              ? roleEntity.resources.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {roleEntity.resources && i === roleEntity.resources.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="coddeeApp.role.tenant">Tenant</Translate>
          </dt>
          <dd>{roleEntity.tenant ? roleEntity.tenant.id : ''}</dd>
          <dt>
            <Translate contentKey="coddeeApp.role.parentRole">Parent Role</Translate>
          </dt>
          <dd>
            {roleEntity.parentRoles
              ? roleEntity.parentRoles.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {roleEntity.parentRoles && i === roleEntity.parentRoles.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/role" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/role/${roleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ role }: IRootState) => ({
  roleEntity: role.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetail);
