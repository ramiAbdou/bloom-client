import React from 'react';

import MasonryList from '@components/organisms/List/MasonryList';
import { ICommunity, IMember, MemberStatus } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreState } from '@core/store/Store';
import { sortObjects } from '@util/util';
import { prepareMemberForFilter } from './Directory.util';
import DirectoryCard from './DirectoryCard';

const DirectoryCardList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: [
      'id',
      'members.id',
      'members.bio',
      'members.email',
      'members.firstName',
      'members.lastName',
      'members.joinedAt',
      'members.pictureUrl',
      'members.position',
      'members.role',
      'members.status'
    ],
    where: { id: communityId }
  });

  console.log('communityData', community);

  if (loading) return null;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore b/c we haven't fixed the community.members type yet.
  const members: IMember[] = community.members
    ?.filter((member: IMember) => member?.status === MemberStatus.ACCEPTED)
    ?.sort((a, b) => sortObjects(a, b, 'joinedAt'));

  return (
    <MasonryList
      className="s-directory-card-ctr"
      items={members}
      options={{
        keys: [
          'firstName',
          'lastName',
          'email',
          'bio',
          (member: IMember) => `${member.firstName} ${member.lastName}`
        ]
      }}
      prepareForFilter={prepareMemberForFilter}
      render={DirectoryCard}
    />
  );
};

export default DirectoryCardList;
