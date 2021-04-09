import React from 'react';

import Sidebar from '@organisms/Sidebar/Sidebar';

const Scene: React.FC = ({ children }) => (
  <>
    <Sidebar />
    <div className="home-content">{children}</div>
  </>
);

export default Scene;
