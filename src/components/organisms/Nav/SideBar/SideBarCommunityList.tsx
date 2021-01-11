import React from 'react';
import { useHistory } from 'react-router-dom';

import useMutation from '@hooks/useMutation';
import { ICommunity, IMember } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  CHANGE_COMMUNITY,
  ChangeCommunityArgs
} from '../../../../core/routing/Router.gql';

interface SideBarCommunityIconProps {
  borderColor: string;
  urlName: string;
  id: string;
  memberId: string;
  logoUrl: string;
}

const SideBarCommunityIcon: React.FC<SideBarCommunityIconProps> = ({
  borderColor,
  logoUrl,
  urlName,
  id,
  memberId
}) => {
  const [changeCommunity] = useMutation<boolean, ChangeCommunityArgs>({
    name: 'changeCommunity',
    query: CHANGE_COMMUNITY
  });

  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);

  const { push } = useHistory();

  const onClick = async () => {
    await changeCommunity({ memberId });
    setActiveCommunity({ communityId: id });
    push(`/${urlName}`);
  };

  const customStyle = { border: `2px ${borderColor} solid` };

  return (
    <button style={customStyle} type="button" onClick={onClick}>
      <img src={logoUrl} />
    </button>
  );
};

const SideBarCommunityList: React.FC = () => {
  const communities: SideBarCommunityIconProps[] = useStoreState(({ db }) => {
    const { activeId, byId: byCommunityId } = db.entities.communities;
    const { byId: byMemberId } = db.entities.members;

    const members: IMember[] = db.user.members?.map((memberId: string) => {
      return byMemberId[memberId];
    });

    return members.map((member: IMember) => {
      const { logoUrl, urlName, id, primaryColor }: ICommunity = byCommunityId[
        member.community
      ];

      // If not active community, border color is just white.
      const borderColor = activeId === member.community ? primaryColor : '#FFF';

      return {
        borderColor,
        id,
        logoUrl,
        memberId: member.id,
        urlName
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
