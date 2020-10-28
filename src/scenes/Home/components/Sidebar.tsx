/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Separator from '@components/Misc/Separator';

const MemberOptions = () => (
  <div>
    <Link to="directory">
      <span>👥</span> Directory
    </Link>

    <Link to="events">
      <span>📅</span> Events
    </Link>

    <Link to="membership">
      <span>💳</span> Your Membership
    </Link>
  </div>
);

const AdminOptions = () => (
  <>
    <p>ADMIN</p>

    <div>
      <Link to="database">
        <span>🖥</span> Member Database
      </Link>

      <Link to="analytics">
        <span>📊</span> Analytics
      </Link>

      <Link to="integrations">
        <span>🤝</span> Integrations
      </Link>

      <Link to="applications">
        <span>📝</span> Pending Applications
      </Link>

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
