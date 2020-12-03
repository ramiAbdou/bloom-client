/**
 * @fileoverview Component: CommunityBar

 */

import './CommunityBar.scss';

import React from 'react';

import { useStoreState } from '@store/Store';

type CommunityIconProps = { borderColor?: string; logoUrl: string };

const CommunityIcon = ({ borderColor, logoUrl }: CommunityIconProps) => {
  const customStyle = { border: `2px ${borderColor ?? '#000'} solid` };

  return (
    <button className="s-home-cbar-community" style={customStyle}>
      <img src={logoUrl} />
    </button>
  );
};

const Icons = () => {
  const { activeId, allIds, byId } = useStoreState(
    ({ entities }) => entities.communities
  );

  return (
    <div className="s-home-cbar-community-ctr">
      {allIds?.map((communityId: string) => (
        <CommunityIcon
          key={communityId}
          borderColor={
            activeId === communityId && byId[communityId].primaryColor
          }
          logoUrl={byId[communityId]?.logoUrl}
        />
      ))}
    </div>
  );
};

export default () => (
  <div className="s-home-cbar">
    <Icons />
  </div>
);
