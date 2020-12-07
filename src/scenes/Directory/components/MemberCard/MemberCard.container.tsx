import deepequal from 'fast-deep-equal';
import React from 'react';

import { IMember, IUser } from '@store/entities';
import { useStoreState } from '@store/Store';
import MemberCard from './MemberCard';
import MemberCardStore, { MemberCardData } from './MemberCard.store';

export default () => {
  const members: MemberCardData[] = useStoreState(({ entities }) => {
    const { allIds: allMemberIds, byId: byMemberId } = entities.members;
    const { byId: byQuestionId } = entities.membershipQuestions;
    const { byId: byUserId } = entities.users;

    return allMemberIds.map((memberId: string) => {
      const { bio, cardData, id, user }: IMember = byMemberId[memberId];

      const {
        email,
        facebookUrl,
        firstName,
        lastName,
        instagramUrl,
        linkedInUrl,
        pictureUrl,
        twitterUrl
      }: IUser = byUserId[user] ?? ({} as IUser);

      return {
        bio,
        email,
        expandedCardData: cardData.map(({ questionId, ...value }) => ({
          ...value,
          title: byQuestionId[questionId]?.title,
          type: byQuestionId[questionId]?.type
        })),
        facebookUrl,
        firstName,
        highlightedField: cardData[0]?.value,
        id,
        instagramUrl,
        lastName,
        linkedInUrl,
        pictureUrl,
        twitterUrl
      };
    });
  }, deepequal);

  return (
    <div className="s-directory-card-ctr">
      {members?.slice(0, 12).map((member) => (
        <MemberCardStore.Provider key={member.id} runtimeModel={{ member }}>
          <MemberCard />
        </MemberCardStore.Provider>
      ))}
    </div>
  );
};
