import React from 'react';
import { useHistory } from 'react-router-dom';

import { ICommunity, IMember } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import useMutation from '../../../../core/hooks/useMutation';
import { CHANGE_COMMUNITY, ChangeCommunityArgs } from '../Nav.gql';

interface SideBarCommunityIconProps {
  borderColor: string;
  encodedUrlName: string;
  id: string;
  memberId: string;
  logoUrl: string;
}

const SideBarCommunityIcon: React.FC<SideBarCommunityIconProps> = ({
  borderColor,
  logoUrl,
  encodedUrlName,
  id,
  memberId
}) => {
  const [changeCommunity] = useMutation<boolean, ChangeCommunityArgs>({
    name: 'changeCommunity',
    query: CHANGE_COMMUNITY
  });

  const updateActiveCommunity = useStoreActions(
    ({ db }) => db.updateActiveCommunity
  );

  const { push } = useHistory();

  const onClick = async () => {
    await changeCommunity({ memberId });
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
    const { activeId, byId: byCommunityId } = db.entities.communities;
    const { byId: byMemberId } = db.entities.members;

    const members: IMember[] = db.user.members?.map((memberId: string) => {
      return byMemberId[memberId];
    });

    return members.map((member: IMember) => {
      const {
        logoUrl,
        encodedUrlName,
        id,
        primaryColor
      }: ICommunity = byCommunityId[member.community];

      return {
        borderColor: activeId === member.community && primaryColor,
        encodedUrlName,
        id,
        logoUrl,
        memberId: member.id
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
