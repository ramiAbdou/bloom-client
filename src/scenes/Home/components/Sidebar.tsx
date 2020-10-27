/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="s-home-sidebar">
    <Link to="directory">Directory</Link>
    <Link to="events">Events</Link>
    <Link to="membership">Your Membership</Link>
    <Link to="applications">Pending Applications</Link>
  </div>
);
