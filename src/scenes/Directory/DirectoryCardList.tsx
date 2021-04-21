import React from 'react';

import MasonryList from '@components/organisms/List/MasonryList';
import { IMember } from '@core/db/db.entities';
import { prepareMemberForFilter } from './Directory.util';
import DirectoryCard from './DirectoryCard';

interface DirectoryCardListProps {
  data: IMember[];
}

const DirectoryCardList: React.FC<DirectoryCardListProps> = ({
  data: members
}) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore b/c we haven't fixed the community.members type yet.
  // const members: IMember[] = community.members
  //   ?.filter((member: IMember) => member?.status === MemberStatus.ACCEPTED)
  //   ?.sort((a, b) => sortObjects(a, b, 'joinedAt'));

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

export default DirectoryCardList;
