import deepequal from 'fast-deep-equal';
import React from 'react';

import MasonryList from '@organisms/List/MasonryList';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import DirectoryCard from './DirectoryCard';

const DirectoryCardList: React.FC = () => {
  const members: any[] = useStoreState(({ db }) => {
    if (!db.community?.members?.length) return [];

    return db.community.members
      ?.map((memberId: string) => {
        const member: IMember = db.byMemberId[memberId];
        const user: IUser = db.byUserId[member?.user];

        const data: IMemberData[] = member.data
          ?.map((dataId: string) => db.byDataId[dataId])
          ?.filter((entity: IMemberData) => {
            const question: IQuestion = db.byQuestionId[entity.question];
            return question?.inDirectoryCard;
          });

        return { ...member, ...user, data, memberId, userId: user?.id };
      })
      ?.filter((member) => member?.status === 'ACCEPTED')
      ?.filter((member) => !!member?.userId)
      ?.sort((a, b) => sortObjects(a, b, 'createdAt'));
  }, deepequal);

  return (
    <MasonryList
      className="s-directory-card-ctr"
      items={members}
      options={{
        keys: [
          (item) => `${item.firstName} ${item.lastName}`,
          'firstName',
          'lastName',
          'email',
          'bio',
          (item) => item.data.map(({ value }) => value.toString())
        ]
      }}
      render={DirectoryCard}
    />
  );
};

export default DirectoryCardList;
