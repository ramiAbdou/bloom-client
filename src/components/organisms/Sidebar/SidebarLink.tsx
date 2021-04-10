import React from 'react';
import { Link } from 'react-router-dom';

import { ICommunity } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import { OnClickProps } from '@util/constants';
import { cx } from '@util/util';
import { SidebarLinkOptions } from './Sidebar.types';
import SidebarLinkNotificationCircle from './SidebarLinkNotificationCircle';

interface SidebarLinkProps extends SidebarLinkOptions, OnClickProps {}

const SidebarLinkAction: React.FC<
  Pick<SidebarLinkProps, 'Icon' | 'onClick' | 'title'>
> = ({ Icon, onClick, title }) => {
  const setIsOpen = useStoreActions(({ sidebar }) => sidebar.setIsOpen);

  const onUpdatedClick = (): void => {
    setIsOpen(false);
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

  const communityId: string = useStoreState(({ db }) => db.communityId);
  const setIsOpen = useStoreActions(({ sidebar }) => sidebar.setIsOpen);

  const isActive: boolean = useTopLevelRoute() === to;

  const { urlName } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  // If onClick is supplied, means it is an action.
  if (onClick) return <SidebarLinkAction {...props} />;

  const css: string = cx('f f-ac o-nav-link', {
    'o-nav-link--active': isActive
  });

  const onLinkClick = (): void => {
    setIsOpen(false);
  };

  return (
    <Link className={css} to={`/${urlName}/${to}`} onClick={onLinkClick}>
      <Icon />
      {title}
      <SidebarLinkNotificationCircle to={to} />
    </Link>
  );
};

export default SidebarLink;
