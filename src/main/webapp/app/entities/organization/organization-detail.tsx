import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './organization.reducer';
import { IOrganization } from 'app/shared/model/organization.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrganizationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrganizationDetail = (props: IOrganizationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { organizationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coddeeApp.organization.detail.title">Organization</Translate> [<b>{organizationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="organizationCode">
              <Translate contentKey="coddeeApp.organization.organizationCode">Organization Code</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.organizationCode}</dd>
          <dt>
            <span id="organizationName">
              <Translate contentKey="coddeeApp.organization.organizationName">Organization Name</Translate>
            </span>
          </dt>
          <dd>{organizationEntity.organizationName}</dd>
          <dt>
            <Translate contentKey="coddeeApp.organization.parentOrganization">Parent Organization</Translate>
          </dt>
          <dd>{organizationEntity.parentOrganization ? organizationEntity.parentOrganization.id : ''}</dd>
          <dt>
            <Translate contentKey="coddeeApp.organization.tenant">Tenant</Translate>
          </dt>
          <dd>{organizationEntity.tenant ? organizationEntity.tenant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/organization" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/organization/${organizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ organization }: IRootState) => ({
  organizationEntity: organization.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetail);
