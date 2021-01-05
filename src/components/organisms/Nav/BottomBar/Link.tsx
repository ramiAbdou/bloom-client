import React, { memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import useFinalPath from '@hooks/useFinalPath';
import { makeClass } from '@util/util';
import { LinkOptions } from '../Nav.types';

/**
 * Each SidebarLink will either have a to property or onClick property defined.
 * If onClick is defined, then we don't render a link, we simply render a
 * Button that opens up a modal.
 */
export default memo(({ Icon, to, title }: LinkOptions) => {
  const { url } = useRouteMatch();
  const isActive = useFinalPath() === to;

  const css = makeClass([
    's-home-bb-link',
    [isActive, 's-home-bb-link--active']
  ]);

  return (
    <Link className={css} to={`${url}/${to}`}>
      <Icon />
      <p>{title}</p>
    </Link>
  );
});
