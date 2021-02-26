import React, { memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { OnClickProps } from '@util/constants';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import { useStoreActions } from '@store/Store';
import { cx } from '@util/util';
import { LinkOptions } from './Nav.types';

interface NavLinkProps extends LinkOptions, OnClickProps {}

const NavLinkAction: React.FC<
  Pick<NavLinkProps, 'Icon' | 'onClick' | 'title'>
> = ({ Icon, onClick, title }) => {
  const setIsOpen = useStoreActions(({ nav }) => nav.setIsOpen);

  const onUpdatedClick = () => {
    setIsOpen(false);
    onClick();
  };

  return (
    <button className="o-nav-link" onClick={onUpdatedClick}>
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
const NavLink: React.FC<NavLinkProps> = (props) => {
  const setIsOpen = useStoreActions(({ nav }) => nav.setIsOpen);
  const { Icon, onClick, to, title } = props;

  const { url } = useRouteMatch();
  const isActive = useTopLevelRoute() === to;

  // If onClick is supplied, means it is an action.
  if (onClick) return <NavLinkAction {...props} />;

  const css = cx('o-nav-link', {
    'o-nav-link--active': isActive
  });

  const onLinkClick = () => setIsOpen(false);

  return (
    <Link className={css} to={`${url}/${to}`} onClick={onLinkClick}>
      <Icon />
      {title}
    </Link>
  );
};

export default memo(NavLink);
