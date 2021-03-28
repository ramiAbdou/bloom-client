import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import useTopLevelRoute from '@hooks/useTopLevelRoute';
import { useStoreActions } from '@store/Store';
import { OnClickProps } from '@util/constants';
import { cx } from '@util/util';
import { SidebarLinkOptions } from './Sidebar.types';

interface SidebarLinkProps extends SidebarLinkOptions, OnClickProps {}

const SidebarLinkAction: React.FC<
  Pick<SidebarLinkProps, 'Icon' | 'onClick' | 'title'>
> = ({ Icon, onClick, title }) => {
  const setIsOpen = useStoreActions(({ sidebar }) => {
    return sidebar.setIsOpen;
  });

  const onUpdatedClick = () => {
    setIsOpen(false);
    onClick();
  };

  return (
    <button className="o-nav-link" type="button" onClick={onUpdatedClick}>
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
const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
  const setIsOpen = useStoreActions(({ sidebar }) => {
    return sidebar.setIsOpen;
  });

  const { Icon, onClick, to, title } = props;

  const { url } = useRouteMatch();
  const isActive = useTopLevelRoute() === to;

  // If onClick is supplied, means it is an action.
  if (onClick) return <SidebarLinkAction {...props} />;

  const css: string = cx('o-nav-link', {
    'o-nav-link--active': isActive
  });

  const onLinkClick = () => {
    return setIsOpen(false);
  };

  return (
    <Link className={css} to={`${url}/${to}`} onClick={onLinkClick}>
      <Icon />
      {title}
    </Link>
  );
};

export default SidebarLink;
