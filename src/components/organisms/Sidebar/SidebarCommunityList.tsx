import React from 'react';

import { IMember, MemberStatus } from '@db/db.entities';
import useFind from '@gql/useFind';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import SidebarCommunityButton from './SidebarCommunityButton';

const SidebarCommunityList: React.FC = () => {
  const userId: string = useStoreState(({ db }) => db.userId);

  const members: IMember[] = useFind(IMember, {
    fields: ['community.id', 'joinedAt'],
    where: { status: MemberStatus.ACCEPTED, userId }
  });

  const sortedMembers: IMember[] = members?.sort((a: IMember, b: IMember) =>
    sortObjects(a, b, 'joinedAt', 'ASC')
  );

  return (
    <div className="f f-ac f-col px-xs py-sm o-nav-community-ctr">
      {sortedMembers.map((sortedMember: IMember) => (
        <SidebarCommunityButton
          key={sortedMember.id}
          id={sortedMember.community.id}
        />
      ))}
    </div>
  );
};

export default SidebarCommunityList;
