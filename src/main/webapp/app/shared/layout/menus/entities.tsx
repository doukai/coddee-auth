import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/user">
      <Translate contentKey="global.menu.entities.user" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/role">
      <Translate contentKey="global.menu.entities.role" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/resource">
      <Translate contentKey="global.menu.entities.resource" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/organization">
      <Translate contentKey="global.menu.entities.organization" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenant">
      <Translate contentKey="global.menu.entities.tenant" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
