/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import './Sidebar.scss';

import React from 'react';
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
  const primaryColor = useStoreState((store) => store.primaryColor);

  return (
    <div className="s-home-sidebar-section">
      <p>Main</p>
      {memberLinks.map(({ Icon, title, to }) => {
        const isActive = window.location.pathname === `${url}/${to}`;
        const iconColor = isActive ? primaryColor : '#000';
        const customStyle = isActive
          ? {
              backgroundColor: `${primaryColor}1A`,
              borderLeft: `3px ${primaryColor} solid`,
              color: primaryColor
            }
          : {};

        const { css } = new CSSModifier()
          .class('s-home-sidebar-link')
          .addClass(isActive, 's-home-sidebar-link--active');

        return (
          <Link key={to} className={css} style={customStyle} to={to}>
            <Icon color={iconColor} />
            {title}
          </Link>
        );
      })}
    </div>
  );
};

const adminLinks: LinkOptions[] = [
  { Icon: IoMdAnalytics, title: 'Analytics', to: 'analytics' },
  { Icon: IoMdGlobe, title: 'Member Database', to: 'database' },
  { Icon: IoMdPaper, title: 'Pending Applicants', to: 'applicants' },
  { Icon: IoMdGitNetwork, title: 'Integrations', to: 'integrations' }
];

const AdminOptions = () => {
  const { url } = useRouteMatch();
  const primaryColor = useStoreState((store) => store.primaryColor);

  return (
    <div className="s-home-sidebar-section" style={{ marginTop: 36 }}>
      <p>Admin</p>
      {adminLinks.map(({ Icon, title, to }) => {
        const isActive = window.location.pathname === `${url}/${to}`;
        const iconColor = isActive ? primaryColor : '#000';
        const customStyle = isActive
          ? {
              backgroundColor: `${primaryColor}1A`,
              borderLeft: `3px ${primaryColor} solid`,
              color: primaryColor
            }
          : {};

        const { css } = new CSSModifier()
          .class('s-home-sidebar-link')
          .addClass(isActive, 's-home-sidebar-link--active');

        return (
          <Link key={to} className={css} style={customStyle} to={to}>
            <Icon color={iconColor} />
            {title}
          </Link>
        );
      })}
    </div>
  );
};

const QuickActions = () => {
  return (
    <div className="s-home-sidebar-section" style={{ marginTop: 36 }}>
      <p>Quick Actions</p>
      <Link className="s-home-sidebar-link" to="/">
        <IoMdAdd color="#000" />
        Create Event
      </Link>

      <Link className="s-home-sidebar-link" to="/">
        <IoMdPersonAdd color="#000" />
        Add Member
      </Link>
    </div>
  );
};

const CommunityName = () => {
  const name = useStoreState(({ community }) => community?.name);
  return <h3>{name}</h3>;
};

export default () => (
  <div className="s-home-sidebar">
    <CommunityName />
    <Separator style={{ marginBottom: 24, marginTop: 24 }} />
    <MemberOptions />
    <AdminOptions />
    <QuickActions />
  </div>
);
