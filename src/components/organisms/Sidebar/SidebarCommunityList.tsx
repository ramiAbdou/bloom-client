import React from 'react';

import { IMember, MemberStatus } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import { useStoreState } from '@core/store/Store';
import { sortObjects } from '@util/util';
import SidebarCommunityButton from './SidebarCommunityButton';

const SidebarCommunityList: React.FC = () => {
  const userId: string = useStoreState(({ db }) => db.userId);

  const { data: members, loading } = useFindFull(IMember, {
    fields: [
      'community.logoUrl',
      'community.id',
      'community.urlName',
      'joinedAt'
    ],
    where: { status: MemberStatus.ACCEPTED, userId }
  });

  if (loading) return null;

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
