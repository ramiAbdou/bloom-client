import deepequal from 'fast-deep-equal';
import React from 'react';

import { IMember, IMemberData } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MasonryList from '../../components/organisms/List/MasonryList';
import DirectoryCard from './DirectoryCard/DirectoryCard';
import { MemberCardModel } from './DirectoryCard/DirectoryCard.store';

const DirectoryCardContainer = () => {
  const members: MemberCardModel[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;
    const { byId: byUserId } = db.entities.users;

    if (!db.community?.members?.length) return [];

    return db.community.members
      ?.map((memberId: string) => {
        const member: IMember = byMemberId[memberId];

        const data: IMemberData[] = member.data
          ?.map((dataId) => byDataId[dataId])
          ?.filter(
            (point: IMemberData) =>
              byQuestionId[point.question]?.inExpandedDirectoryCard
          );

        return {
          ...byUserId[member.user],
          ...member,
          data,
          memberId: member.id,
          userId: member.user
        };
      })
      ?.filter((member) => member?.status === 'ACCEPTED');
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

export default DirectoryCardContainer;
