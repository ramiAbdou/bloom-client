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
  <div>
    {memberLinks.map(({ emoji, title, to }) => (
      <Link to={to}>
        <span>{emoji}</span> {title}
      </Link>
    ))}
  </div>
);

const adminLinks: LinkOptions[] = [
  { emoji: '🖥', title: 'Member Database', to: 'database' },
  { emoji: '📝', title: 'Pending Applications', to: 'applications' },
  { emoji: '📊', title: 'Analytics', to: 'analytics' },
  { emoji: '🤝', title: 'Integrations', to: 'integrations' },
  { emoji: '🤩', title: 'Admins', to: 'admins' }
];

const AdminOptions = () => (
  <>
    <p>ADMIN</p>

    <div>
      {adminLinks.map(({ emoji, title, to }) => (
        <Link to={to}>
          <span>{emoji}</span> {title}
        </Link>
      ))}

      <Separator style={{ marginBottom: 12, marginTop: 12 }} />
      <Link to="create-event">+ Create Event</Link>
    </div>
  </>
);

export default () => (
  <div className="s-home-sidebar">
    <MemberOptions />
    <AdminOptions />
  </div>
);
