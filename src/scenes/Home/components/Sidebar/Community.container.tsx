import React from 'react';

import { useStoreState } from '@store/Store';

type CommunityIconProps = { borderColor?: string; logoUrl: string };

const CommunityIcon = ({ borderColor, logoUrl }: CommunityIconProps) => {
  const customStyle = { border: `2px ${borderColor ?? '#000'} solid` };

  return (
    <button className="s-home-sidebar-community" style={customStyle}>
      <img src={logoUrl} />
    </button>
  );
};

export default () => {
  const { activeId, allIds, byId } = useStoreState(
    ({ db }) => db.entities.communities
  );

  return (
    <div className="s-home-sidebar-community-ctr">
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
