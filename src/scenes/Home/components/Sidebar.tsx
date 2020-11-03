/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React from 'react';
import {
  IoMdAdd,
  IoMdAnalytics,
  IoMdCalendar,
  IoMdGlobe,
  IoMdHand,
  IoMdPaper,
  IoMdPeople,
  IoMdPersonAdd
} from 'react-icons/io';
import { Link, useRouteMatch } from 'react-router-dom';

import Separator from '@components/Misc/Separator';
import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';

type LinkOptions = { Icon: React.FC<any>; to: string; title: string };

const memberLinks: LinkOptions[] = [
  { Icon: IoMdPeople, title: 'Directory', to: 'directory' },
  { Icon: IoMdCalendar, title: 'Events', to: 'events' }
];

const MemberOptions = () => {
  const { url } = useRouteMatch();
  return (
    <>
      {memberLinks.map(({ Icon, title, to }) => {
        const isActive = window.location.pathname === `${url}/${to}`;
        const iconColor = isActive ? '#FFF' : '#000';
        const { css } = new CSSModifier()
          .class('s-home-sidebar-link')
          .addClass(isActive, 's-home-sidebar-link--active');

        return (
          <Link key={to} className={css} to={to}>
            <Icon color={iconColor} />
            {title}
          </Link>
        );
      })}
    </>
  );
};

const adminLinks: LinkOptions[] = [
  { Icon: IoMdGlobe, title: 'Member Database', to: 'database' },
  { Icon: IoMdPaper, title: 'Pending Applicants', to: 'applicants' },
  { Icon: IoMdAnalytics, title: 'Analytics', to: 'analytics' },
  { Icon: IoMdHand, title: 'Integrations', to: 'integrations' }
];

const AdminOptions = () => {
  const { url } = useRouteMatch();
  return (
    <>
      {adminLinks.map(({ Icon, title, to }) => {
        const isActive = window.location.pathname === `${url}/${to}`;
        const iconColor = isActive ? '#FFF' : '#000';
        const { css } = new CSSModifier()
          .class('s-home-sidebar-link')
          .addClass(isActive, 's-home-sidebar-link--active');

        return (
          <Link key={to} className={css} to={to}>
            <Icon color={iconColor} />
            {title}
          </Link>
        );
      })}
    </>
  );
};

const QuickActions = () => (
  <>
    <Link className="s-home-sidebar-link" to="/">
      <IoMdAdd color="#000" />
      Create Event
    </Link>

    <Link className="s-home-sidebar-link" to="/">
      <IoMdPersonAdd color="#000" />
      Add Member
    </Link>
  </>
);

const CommunityName = () => {
  const name = useStoreState(({ community }) => community?.name);
  return <h4>{name}</h4>;
};

export default () => (
  <div className="s-home-sidebar">
    <CommunityName />
    <Separator style={{ marginBottom: 24, marginTop: 24 }} />
    <MemberOptions />
    <Separator style={{ marginBottom: 24, marginTop: 24 }} />
    <AdminOptions />
    <Separator style={{ marginBottom: 24, marginTop: 24 }} />
    <QuickActions />
  </div>
);
