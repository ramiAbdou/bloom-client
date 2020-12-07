import React from 'react';

import Header from './components/Header';
import MemberCardContainer from './components/MemberCard/MemberCard.container';

export default () => {
  return (
    <div className="s-directory">
      <Header />
      <MemberCardContainer />
    </div>
  );
};
