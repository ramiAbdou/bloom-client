/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Separator from '@components/Misc/Separator';

type LinkOptions = { emoji: string; to: string; title: string };

const memberLinks: LinkOptions[] = [
  { emoji: '👥', title: 'Directory', to: 'directory' },
  { emoji: '📅', title: 'Events', to: 'events' },
  { emoji: '💳', title: 'Your Membership', to: 'membership' }
];

const MemberOptions = () => (
  <>
    {memberLinks.map(({ emoji, title, to }) => (
      <Link key={to} to={to}>
        <span>{emoji}</span> {title}
      </Link>
    ))}
  </>
);

const adminLinks: LinkOptions[] = [
  { emoji: '🖥', title: 'Member Database', to: 'database' },
  { emoji: '📝', title: 'Pending Applicants', to: 'applicants' },
  { emoji: '📊', title: 'Analytics', to: 'analytics' },
  { emoji: '🤝', title: 'Integrations', to: 'integrations' }
];

const AdminOptions = () => (
  <>
    <p>ADMIN</p>

    <>
      {adminLinks.map(({ emoji, title, to }) => (
        <Link key={to} to={to}>
          <span>{emoji}</span> {title}
        </Link>
      ))}

      <Separator style={{ marginBottom: 12, marginTop: 12 }} />
      <Link to="create-event">+ Create Event</Link>
    </>
  </>
);

export default () => (
  <div className="s-home-sidebar">
    <MemberOptions />
    <AdminOptions />
  </div>
);
