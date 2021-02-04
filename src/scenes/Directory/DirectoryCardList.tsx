import deepequal from 'fast-deep-equal';
import React from 'react';

import MasonryList from '@organisms/List/MasonryList';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import DirectoryCard from './DirectoryCard';

const DirectoryCardList: React.FC = () => {
  const members: any[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;
    const { byId: byUserId } = db.entities.users;

    if (!db.community?.members?.length) return [];

    return db.community.members
      ?.map((memberId: string) => {
        const member: IMember = byMemberId[memberId];
        const user: IUser = byUserId[member?.user];

        const data: IMemberData[] = member.data
          ?.map((dataId: string) => byDataId[dataId])
          ?.filter((entity: IMemberData) => {
            const question: IQuestion = byQuestionId[entity.question];
            return question?.inDirectoryCard;
          });

        return { ...member, ...user, data, memberId, userId: user?.id };
      })
      ?.filter((member) => member?.status === 'ACCEPTED')
      ?.filter((member) => !!member?.userId);
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
