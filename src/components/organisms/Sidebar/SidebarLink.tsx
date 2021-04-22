import React from 'react';
import { Link } from 'react-router-dom';
import { isSidebarOpenVar } from 'src/App.reactive';

import { gql } from '@apollo/client';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import { ComponentWithFragments, OnClickProps } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { cx } from '@util/util';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarLinkNotificationCircle from './SidebarLinkNotificationCircle';

interface SidebarLinkProps extends SidebarLinkOptions, OnClickProps {}

const SidebarLinkAction: React.FC<
  Pick<SidebarLinkProps, 'Icon' | 'onClick' | 'title'>
> = ({ Icon, onClick, title }) => {
  const onUpdatedClick = (): void => {
    isSidebarOpenVar(false);
    if (onClick) onClick();
  };

  return (
    <button
      className="f f-ac o-nav-link"
      type="button"
      onClick={onUpdatedClick}
    >
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
const SidebarLink: ComponentWithFragments<IMember, SidebarLinkProps> = ({
  data: member,
  ...props
}) => {
  const { Icon, onClick, to, title } = props;

  const isActive: boolean = useTopLevelRoute(member?.community.urlName) === to;

  // If onClick is supplied, means it is an action.
  if (onClick) return <SidebarLinkAction {...props} />;

  const css: string = cx('f f-ac o-nav-link', {
    'o-nav-link--active': isActive
  });

  const onLinkClick = (): void => {
    isSidebarOpenVar(false);
  };

  return (
    <Link
      className={css}
      to={`/${member?.community.urlName}/${to}`}
      onClick={onLinkClick}
    >
      <Icon />
      {title}
      <SidebarLinkNotificationCircle to={to} />
    </Link>
  );
};

SidebarLink.fragment = gql`
  fragment SidebarLinkFragment on members {
    community {
      urlName
    }
  }
`;

export default SidebarLink;
