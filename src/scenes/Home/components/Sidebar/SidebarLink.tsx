import React, { memo } from 'react';
import {
  IoAdd,
  IoCalendar,
  IoExtensionPuzzle,
  IoFolderOpen,
  IoGlobe,
  IoPeople,
  IoPersonAdd,
  IoStatsChart
} from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Button from '@components/Button/Button';
import { OnClickProps } from '@constants';
import { useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import Sidebar, { LinkOptions } from './Sidebar.store';

type IconProps = { to: string };

const Icon = memo(({ to }: IconProps) => {
  if (to === 'directory') return <IoPeople />;
  if (to === 'events') return <IoCalendar />;
  if (to === 'analytics') return <IoStatsChart />;
  if (to === 'database') return <IoGlobe />;
  if (to === 'applicants') return <IoFolderOpen />;
  if (to === 'integrations') return <IoExtensionPuzzle />;
  if (to === 'create-event') return <IoAdd />;
  if (to === 'add-member') return <IoPersonAdd />;
  return null;
});

interface SidebarLinkProps extends LinkOptions, OnClickProps {}

export default ({ onClick, to, title }: SidebarLinkProps) => {
  const isActive = Sidebar.useStoreState((store) => store.isActive(to));
  const setActiveTo = Sidebar.useStoreActions((actions) => actions.setActiveTo);

  const encodedUrlName = useStoreState(
    ({ community }) => community.encodedUrlName
  );

  const css = makeClass([
    's-home-sidebar-link',
    [isActive, 's-home-sidebar-link--active']
  ]);

  if (onClick)
    return (
      <Button className="s-home-sidebar-link" onClick={onClick}>
        <Icon to={to} />
        {title}
      </Button>
    );

  return (
    <Link
      className={css}
      to={`/${encodedUrlName}/${to}`}
      onClick={() => setActiveTo(to)}
    >
      <Icon to={to} />
      {title}
    </Link>
  );
};
