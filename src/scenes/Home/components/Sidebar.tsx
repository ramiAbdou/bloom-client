/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React from 'react';
import {
  IoMdAnalytics,
  IoMdCalendar,
  IoMdGlobe,
  IoMdHand,
  IoMdPaper,
  IoMdPeople
} from 'react-icons/io';
import { Link } from 'react-router-dom';

import Separator from '@components/Misc/Separator';

type LinkOptions = { Icon: React.FC<any>; to: string; title: string };

const memberLinks: LinkOptions[] = [
  { Icon: IoMdPeople, title: 'Directory', to: 'directory' },
  { Icon: IoMdCalendar, title: 'Events', to: 'events' }
];

const MemberOptions = () => (
  <>
    {memberLinks.map(({ Icon, title, to }) => (
      <Link key={to} to={to}>
        <Icon color="#000" />
        {title}
      </Link>
    ))}
  </>
);

const adminLinks: LinkOptions[] = [
  { Icon: IoMdGlobe, title: 'Member Database', to: 'database' },
  { Icon: IoMdPaper, title: 'Pending Applicants', to: 'applicants' },
  { Icon: IoMdAnalytics, title: 'Analytics', to: 'analytics' },
  { Icon: IoMdHand, title: 'Integrations', to: 'integrations' }
];

const AdminOptions = () => (
  <>
    <p>ADMIN</p>

    <>
      {adminLinks.map(({ Icon, title, to }) => (
        <Link key={to} to={to}>
          <Icon color="#000" />
          {title}
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
