import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user.reducer';
import { IUser } from 'app/shared/model/user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserDetail = (props: IUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coddeeApp.user.detail.title">User</Translate> [<b>{userEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="login">
              <Translate contentKey="coddeeApp.user.login">Login</Translate>
            </span>
          </dt>
          <dd>{userEntity.login}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="coddeeApp.user.password">Password</Translate>
            </span>
          </dt>
          <dd>{userEntity.password}</dd>
          <dt>
            <span id="userName">
              <Translate contentKey="coddeeApp.user.userName">User Name</Translate>
            </span>
          </dt>
          <dd>{userEntity.userName}</dd>
          <dt>
            <span id="activated">
              <Translate contentKey="coddeeApp.user.activated">Activated</Translate>
            </span>
          </dt>
          <dd>{userEntity.activated ? 'true' : 'false'}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="coddeeApp.user.email">Email</Translate>
            </span>
          </dt>
          <dd>{userEntity.email}</dd>
          <dt>
            <Translate contentKey="coddeeApp.user.organization">Organization</Translate>
          </dt>
          <dd>{userEntity.organization ? userEntity.organization.id : ''}</dd>
          <dt>
            <Translate contentKey="coddeeApp.user.tenant">Tenant</Translate>
          </dt>
          <dd>{userEntity.tenant ? userEntity.tenant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user/${userEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ user }: IRootState) => ({
  userEntity: user.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
