/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React, { memo } from 'react';
import {
  IoIosCalendar,
  IoIosDocument,
  IoIosGitBranch,
  IoIosGlobe,
  IoIosStats,
  IoMdAdd,
  IoMdPeople,
  IoMdPersonAdd
} from 'react-icons/io';
import { Link } from 'react-router-dom';

import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import Sidebar, { LinkOptions } from './Sidebar.store';

type IconProps = { to: string };

const Icon = memo(({ to }: IconProps) => {
  if (to === 'directory') return <IoMdPeople />;
  if (to === 'events') return <IoIosCalendar />;
  if (to === 'analytics') return <IoIosStats />;
  if (to === 'database') return <IoIosGlobe />;
  if (to === 'applicants') return <IoIosDocument />;
  if (to === 'integrations') return <IoIosGitBranch />;
  if (to === 'create-event') return <IoMdAdd />;
  if (to === 'add-member') return <IoMdPersonAdd />;
  return null;
});

export default ({ to, title }: LinkOptions) => {
  const isActive = Sidebar.useStoreState((store) => store.isActive(to));
  const setActiveTo = Sidebar.useStoreActions((actions) => actions.setActiveTo);
  const encodedUrlName = useStoreState(
    ({ community }) => community.encodedUrlName
  );

  const { css } = new CSSModifier()
    .class('s-home-sidebar-link')
    .addClass(isActive, 's-home-sidebar-link--active');

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
