/**
 * @fileoverview Scene: Home
 * @author Rami Abdou
 */

import './Home.scss';

import React from 'react';

import Navbar from '@components/Navbar/Navbar';
import Sidebar from './components/Sidebar';

export default () => (
  <div className="s-home">
    <Navbar />
    <Sidebar />
  </div>
);
