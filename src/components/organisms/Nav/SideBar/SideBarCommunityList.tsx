import React from 'react';
import { useHistory } from 'react-router-dom';

import { ICommunity, IMember } from '@store/entities';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';

interface SideBarCommunityIconProps {
  id: string;
  isActive?: boolean;
  logoUrl: string;
  urlName: string;
}

const SideBarCommunityIcon: React.FC<SideBarCommunityIconProps> = ({
  logoUrl,
  urlName,
  id,
  isActive
}) => {
  const communityId = useStoreState(({ db }) => db.community.id);

  const { push } = useHistory();
  const onClick = () => id !== communityId && push(`/${urlName}`);

  const css = cx({
    'o-side-bar-community': true,
    'o-side-bar-community--active': isActive
  });

  return (
    <button className={css} type="button" onClick={onClick}>
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
      const { logoUrl, urlName, id }: ICommunity = byCommunityId[
        member.community
      ];

      return {
        id,
        isActive: activeId === member.community,
        logoUrl,
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
