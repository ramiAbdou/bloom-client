import React from 'react';

import { ICommunity, IMember, MemberStatus } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import MasonryList from '@organisms/List/MasonryList';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { prepareMemberForFilter } from './Directory.util';
import DirectoryCard from './DirectoryCard';

const DirectoryCardList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const community: ICommunity = useFindOne(ICommunity, {
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
