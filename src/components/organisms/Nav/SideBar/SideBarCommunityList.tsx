import React from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreActions, useStoreState } from '@store/Store';

interface SideBarCommunityIconProps {
  borderColor: string;
  encodedUrlName: string;
  id: string;
  logoUrl: string;
}

const SideBarCommunityIcon: React.FC<SideBarCommunityIconProps> = ({
  borderColor,
  logoUrl,
  encodedUrlName,
  id
}) => {
  const { push } = useHistory();

  const updateActiveCommunity = useStoreActions(
    ({ db }) => db.updateActiveCommunity
  );

  const onClick = () => {
    updateActiveCommunity(id);
    push(`/${encodedUrlName}`);
  };

  const customStyle = { border: `2px ${borderColor ?? '#000'} solid` };

  return (
    <button style={customStyle} type="button" onClick={onClick}>
      <img src={logoUrl} />
    </button>
  );
};

const SideBarCommunityList: React.FC = () => {
  const communities: SideBarCommunityIconProps[] = useStoreState(({ db }) => {
    const { activeId, allIds, byId } = db.entities.communities;

    return allIds?.map((communityId: string) => {
      const { logoUrl, encodedUrlName, id, primaryColor } = byId[communityId];

      return {
        borderColor: activeId === communityId && primaryColor,
        encodedUrlName,
        id,
        logoUrl
      };
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
