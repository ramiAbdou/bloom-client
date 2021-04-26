import React from 'react';

import MainContent from './Main/MainContent';

const Scene: React.FC = ({ children }) => (
  <div className="home-content">
    <MainContent> {children}</MainContent>
  </div>
);

export default Scene;
