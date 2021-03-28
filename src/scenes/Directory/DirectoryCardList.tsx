import deepequal from 'fast-deep-equal';
import React from 'react';

import MasonryList from '@organisms/List/MasonryList';
import {
  IMember,
  IMemberValue,
  IQuestion,
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

        const values: IMemberValue[] = member.values
          ?.map((valueId: string) => {
            return db.byValuesId[valueId];
          })
          ?.filter((value: IMemberValue) => {
            const question: IQuestion = db.byQuestionId[value.question];
            return !question?.locked;
          });

        return { ...member, memberId, values };
      })
      ?.filter((member) => {
        return member?.status === MemberStatus.ACCEPTED;
      })
      ?.sort((a, b) => {
        return sortObjects(a, b, 'joinedAt');
      });
  }, deepequal);

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
          (item) => {
            return `${item.firstName} ${item.lastName}`;
          },
          (item) => {
            return item.values.map(({ value }) => {
              return value?.toString();
            });
          }
        ]
      }}
      prepareForFilter={prepareMemberForFilter}
      render={DirectoryCard}
    />
  );
};

export default DirectoryCardList;
