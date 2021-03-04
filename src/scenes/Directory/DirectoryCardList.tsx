import deepequal from 'fast-deep-equal';
import React from 'react';

import MasonryList from '@organisms/List/MasonryList';
import {
  IMember,
  IMemberValue,
  IQuestion,
  IUser,
  MemberStatus
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { prepareMemberForFilter } from './Directory.util';
import DirectoryCard from './DirectoryCard';

const DirectoryCardList: React.FC = () => {
  const members: any[] = useStoreState(({ db }) => {
    if (!db.community?.members?.length) return [];

    return db.community.members
      ?.map((memberId: string) => {
        const member: IMember = db.byMemberId[memberId];
        const user: IUser = db.byUserId[member?.user];

        const values: IMemberValue[] = member.values
          ?.map((valueId: string) => db.byValuesId[valueId])
          ?.filter((value: IMemberValue) => {
            const question: IQuestion = db.byQuestionId[value.question];
            return !question?.locked;
          });

        return { ...member, ...user, memberId, userId: user?.id, values };
      })
      ?.filter((member) => member?.status === MemberStatus.ACCEPTED)
      ?.filter((member) => !!member?.userId)
      ?.filter((member) => !member?.deletedAt)
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
          (item) => item.values.map(({ value }) => value.toString())
        ]
      }}
      prepareForFilter={prepareMemberForFilter}
      render={DirectoryCard}
    />
  );
};

export default DirectoryCardList;
