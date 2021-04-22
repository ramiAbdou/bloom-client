import React from 'react';
import { Link } from 'react-router-dom';
import { communityIdVar, isSidebarOpenVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import useFindOne from '@gql/hooks/useFindOne';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import { OnClickProps } from '@util/constants';
import { ICommunity } from '@util/constants.entities';
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
const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
  const { Icon, onClick, to, title } = props;

  const communityId: string = useReactiveVar(communityIdVar);
  const isActive: boolean = useTopLevelRoute() === to;

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  if (loading) return null;

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
      to={`/${community.urlName}/${to}`}
      onClick={onLinkClick}
    >
      <Icon />
      {title}
      <SidebarLinkNotificationCircle to={to} />
    </Link>
  );
};

export default SidebarLink;
