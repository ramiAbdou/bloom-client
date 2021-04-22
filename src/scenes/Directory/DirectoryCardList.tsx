import { Masonry } from 'masonic';
import hash from 'object-hash';
import React from 'react';

import { IMember } from '@core/db/db.entities';
import DirectoryCard from './DirectoryCard';

interface DirectoryCardListProps {
  directoryMemberValuesExp: Record<string, unknown>;
  directoryRoleExp: Record<string, unknown>;
  directorySearchString: string;
  members: IMember[];
}

const DirectoryCardList: React.FC<DirectoryCardListProps> = ({
  directoryMemberValuesExp,
  directoryRoleExp,
  directorySearchString,
  members
}) => {
  const key: string = hash({
    memberValuesExp: directoryMemberValuesExp,
    roleExp: directoryRoleExp,
    searchString: directorySearchString
  });

  return (
    <Masonry
      key={key}
      className="s-directory-card-ctr"
      columnGutter={16}
      items={members}
      overscanBy={5}
      render={DirectoryCard}
      style={{ outline: 'none' }}
    />
  );
};

export default DirectoryCardList;
