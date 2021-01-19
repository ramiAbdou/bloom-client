import React, { memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import useActiveRoute from '@hooks/useActiveRoute';
import { cx } from '@util/util';
import { LinkOptions } from '../Nav.types';

/**
 * Each SidebarLink will either have a to property or onClick property defined.
 * If onClick is defined, then we don't render a link, we simply render a
 * Button that opens up a modal.
 */
const BottomBarLink: React.FC<LinkOptions> = ({ Icon, to, title }) => {
  const { url } = useRouteMatch();
  const isActive = useActiveRoute() === to;

  const css = cx('o-bottom-bar-link', {
    'o-bottom-bar-link--active': isActive
  });

  return (
    <Link className={css} to={`${url}/${to}`}>
      <Icon />
      <p>{title}</p>
    </Link>
  );
};

export default memo(BottomBarLink);
