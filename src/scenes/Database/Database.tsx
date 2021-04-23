import React from 'react';

import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import DatabaseHeader from './DatabaseHeader';
import MemberDatabase from './MemberDatabase/MemberDatabase';

const Database: React.FC = () => (
  <Scene>
    <MainContent>
      <DatabaseHeader loading={false} />
      <MemberDatabase />
    </MainContent>
  </Scene>
);

export default Database;
