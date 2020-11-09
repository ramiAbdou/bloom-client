/**
 * @fileoverview Component: CommunityIcons
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';

type CommunityIconProps = { borderColor?: string; logoUrl: string };

const CommunityIcon = ({ borderColor, logoUrl }: CommunityIconProps) => {
  const customStyle = { border: `3px ${borderColor ?? '#000'} solid` };

  return (
    <button className="c-nav-community" style={customStyle}>
      <img src={logoUrl} />
    </button>
  );
};

export default () => {
  const { activeId, allIds, byId } = useStoreState(
    ({ communities }) => communities
  );

  return (
    <div className="c-nav-community-ctr">
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
