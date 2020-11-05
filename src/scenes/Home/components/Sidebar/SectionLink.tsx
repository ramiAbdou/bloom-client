/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React, { memo } from 'react';
import {
  IoMdAdd,
  IoMdAnalytics,
  IoMdCalendar,
  IoMdGitNetwork,
  IoMdGlobe,
  IoMdPaper,
  IoMdPeople,
  IoMdPersonAdd
} from 'react-icons/io';
import { Link } from 'react-router-dom';

import CSSModifier from '@util/CSSModifier';
import Sidebar, { LinkOptions } from './Sidebar.store';

type IconProps = { to: string };

const Icon = memo(({ to }: IconProps) => {
  if (to === 'directory') return <IoMdPeople />;
  if (to === 'events') return <IoMdCalendar />;
  if (to === 'analytics') return <IoMdAnalytics />;
  if (to === 'database') return <IoMdGlobe />;
  if (to === 'applicants') return <IoMdPaper />;
  if (to === 'integrations') return <IoMdGitNetwork />;
  if (to === 'create-event') return <IoMdAdd />;
  if (to === 'add-member') return <IoMdPersonAdd />;
  return null;
});

export default ({ to, title }: LinkOptions) => {
  const isActive = Sidebar.useStoreState((store) => store.isActive(to));
  const setActiveTo = Sidebar.useStoreActions((actions) => actions.setActiveTo);

  const { css } = new CSSModifier()
    .class('s-home-sidebar-link')
    .addClass(isActive, 's-home-sidebar-link--active');

  return (
    <Link className={css} to={to} onClick={() => setActiveTo(to)}>
      <Icon to={to} />
      {title}
    </Link>
  );
};
