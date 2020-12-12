import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/Button/Button';
import { OnClickProps } from '@constants';
import { useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import Home, { LinkOptions } from '../../Home.store';

interface SidebarLinkProps extends LinkOptions, OnClickProps {}

/**
 * Each SidebarLink will either have a to property or onClick property defined.
 * If onClick is defined, then we don't render a link, we simply render a
 * Button that opens up a modal.
 */
export default memo(({ Icon, onClick, to, title }: SidebarLinkProps) => {
  const encodedUrlName = useStoreState(({ db }) => db.community.encodedUrlName);

  const isActive = Home.useStoreState((store) => store.isActive(to));
  const setActiveTo = Home.useStoreActions((store) => store.setActiveTo);

  const css = makeClass([
    's-home-sidebar-link',
    [isActive, 's-home-sidebar-link--active']
  ]);

  if (onClick) {
    return (
      <Button className={css} onClick={onClick}>
        <Icon />
        {title}
      </Button>
    );
  }

  const onClickLink = () => setActiveTo(to);

  return (
    <Link className={css} to={`/${encodedUrlName}/${to}`} onClick={onClickLink}>
      <Icon />
      {title}
    </Link>
  );
});
