import React, { memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Button from '@atoms/Button';
import { ModalType, OnClickProps } from '@constants';
import useFinalPath from '@hooks/useFinalPath';
import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import { LinkOptions } from '../Nav.types';

interface SidebarLinkProps extends LinkOptions, OnClickProps {}

/**
 * Each SidebarLink will either have a to property or onClick property defined.
 * If onClick is defined, then we don't render a link, we simply render a
 * Button that opens up a modal.
 */
export default memo(({ Icon, onClick, to, title }: SidebarLinkProps) => {
  const isStripeConnected = useStoreState(({ db }) => {
    return db.entities.integrations.byId[db.community?.integrations]
      ?.stripeAccountId;
  });

  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isActive = useFinalPath() === to;
  const { url } = useRouteMatch();

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

  if (isStripeConnected && duesStatus !== 'ACTIVE') {
    const onDuesProtectedClick = () => showModal(ModalType.PAY_DUES);

    return (
      <Button className={css} onClick={onDuesProtectedClick}>
        <Icon />
        {title}
      </Button>
    );
  }

  return (
    <Link className={css} to={`${url}/${to}`}>
      <Icon />
      {title}
    </Link>
  );
});
