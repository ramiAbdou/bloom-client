import React, { memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { ModalType, OnClickProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import useActiveRoute from '../../../../core/hooks/useActiveRoute';
import { LinkOptions } from '../Nav.types';

interface SidebarLinkProps extends LinkOptions, OnClickProps {}

const SideBarLinkAction: React.FC<
  Pick<SidebarLinkProps, 'Icon' | 'onClick' | 'title'>
> = ({ Icon, onClick, title }) => {
  return (
    <button className="o-side-bar-link" onClick={onClick}>
      <Icon />
      {title}
    </button>
  );
};

const SideBarLinkProtected: React.FC<
  Pick<SidebarLinkProps, 'Icon' | 'title'>
> = ({ Icon, title }) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.PAY_DUES);

  return (
    <button className="o-side-bar-link" onClick={onClick}>
      <Icon />
      {title}
    </button>
  );
};

/**
 * Each SidebarLink will either have a to property or onClick property defined.
 * If onClick is defined, then we don't render a link, we simply render a
 * Button that opens up a modal.
 */
const SideBarLink: React.FC<SidebarLinkProps> = (props) => {
  const { Icon, onClick, to, title } = props;

  const isAdmin = useStoreState(({ db }) => db.isAdmin);

  const isStripeConnected = useStoreState(({ db }) => {
    return !!db.entities.integrations.byId[db.community?.integrations]
      ?.stripeAccountId;
  });

  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);

  const { url } = useRouteMatch();
  const isActive = useActiveRoute() === to;

  // If onClick is supplied, means it is an action.
  if (onClick) return <SideBarLinkAction {...props} />;

  // If member hasn't paid their dues, don't let them go to any route.
  if (
    isStripeConnected &&
    duesStatus !== 'ACTIVE' &&
    !isAdmin &&
    to !== 'directory'
  ) {
    return <SideBarLinkProtected {...props} />;
  }

  const css = cx({
    'o-side-bar-link': true,
    'o-side-bar-link--active': isActive
  });

  return (
    <Link className={css} to={`${url}/${to}`}>
      <Icon />
      {title}
    </Link>
  );
};

export default memo(SideBarLink);
