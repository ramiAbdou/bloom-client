/**
 * @fileoverview Component: Navbar
 * @author Rami Abdou
 */

import './Navbar.scss';

import React from 'react';

import CommunityIcons from './components/CommunityIcons';
import ProfilePicture from './components/ProfilePicture';

export default () => (
  <div className="c-nav">
    <CommunityIcons />
    <ProfilePicture />
  </div>
);
