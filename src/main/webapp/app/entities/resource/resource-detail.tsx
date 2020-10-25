import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './resource.reducer';
import { IResource } from 'app/shared/model/resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResourceDetail = (props: IResourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { resourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coddeeApp.resource.detail.title">Resource</Translate> [<b>{resourceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="url">
              <Translate contentKey="coddeeApp.resource.url">Url</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.url}</dd>
          <dt>
            <span id="method">
              <Translate contentKey="coddeeApp.resource.method">Method</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.method}</dd>
          <dt>
            <span id="resourceName">
              <Translate contentKey="coddeeApp.resource.resourceName">Resource Name</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.resourceName}</dd>
          <dt>
            <Translate contentKey="coddeeApp.resource.tenant">Tenant</Translate>
          </dt>
          <dd>{resourceEntity.tenant ? resourceEntity.tenant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/resource" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/resource/${resourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ resource }: IRootState) => ({
  resourceEntity: resource.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);
