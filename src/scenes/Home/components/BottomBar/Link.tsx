import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import Home, { LinkOptions } from '../../Home.store';

/**
 * Each SidebarLink will either have a to property or onClick property defined.
 * If onClick is defined, then we don't render a link, we simply render a
 * Button that opens up a modal.
 */
export default memo(({ Icon, to, title }: LinkOptions) => {
  const encodedUrlName = useStoreState(
    ({ community }) => community.encodedUrlName
  );

  const isActive = Home.useStoreState((store) => store.isActive(to));
  const setActiveTo = Home.useStoreActions((store) => store.setActiveTo);

  const css = makeClass([
    's-home-bb-link',
    [isActive, 's-home-bb-link--active']
  ]);

  const onClickLink = () => setActiveTo(to);

  return (
    <Link className={css} to={`/${encodedUrlName}/${to}`} onClick={onClickLink}>
      <Icon />
      <p>{title}</p>
    </Link>
  );
});
