import React from 'react';

import { useStoreState } from '@store/Store';

interface SideBarCommunityIconProps {
  borderColor?: string;
  logoUrl: string;
}

const SideBarCommunityIcon: React.FC<SideBarCommunityIconProps> = ({
  borderColor,
  logoUrl
}) => {
  const customStyle = { border: `2px ${borderColor ?? '#000'} solid` };

  return (
    <button style={customStyle}>
      <img src={logoUrl} />
    </button>
  );
};

const SideBarCommunityList: React.FC = () => {
  const communities: SideBarCommunityIconProps[] = useStoreState(({ db }) => {
    const { activeId, allIds, byId } = db.entities.communities;

    return allIds?.map((communityId: string) => {
      const { logoUrl, primaryColor } = byId[communityId];
      return { borderColor: activeId === communityId && primaryColor, logoUrl };
    });
  });

  return (
    <div className="o-side-bar-community-ctr">
      {communities?.map((props: SideBarCommunityIconProps) => (
        <SideBarCommunityIcon key={props.logoUrl} {...props} />
      ))}
    </div>
  );
};

export default SideBarCommunityList;
