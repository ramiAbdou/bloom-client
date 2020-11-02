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
import { Link } from 'react-router-dom';

import Separator from '@components/Misc/Separator';
import { useStoreState } from '@store/Store';

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
    {adminLinks.map(({ Icon, title, to }) => (
      <Link key={to} to={to}>
        <Icon color="#000" />
        {title}
      </Link>
    ))}
  </>
);

const QuickActions = () => (
  <>
    <Link to="/">
      <IoMdAdd color="#000" />
      Create Event
    </Link>

    <Link to="/">
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
