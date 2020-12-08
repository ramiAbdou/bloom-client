import deepequal from 'fast-deep-equal';
import { Masonry } from 'masonic';
import React from 'react';

import { IMembership, IUser } from '@store/entities';
import { useStoreState } from '@store/Store';
import Directory from '../../Directory.store';
import MemberCard from './MemberCard';
import { MemberCardData } from './MemberCard.store';

export default () => {
  const searchString = Directory.useStoreState((store) => store.searchString);

  const members: MemberCardData[] = useStoreState(({ entities }) => {
    const { allIds, byId: byMembershipId } = entities.memberships;
    const { byId: byQuestionId } = entities.questions;
    const { byId: byUserId } = entities.users;

    if (!allIds?.length) return [];

    const lowerCaseSearchString = searchString.toLowerCase().trim();

    return allIds?.reduce((acc: MemberCardData[], curr: string) => {
      const { bio, cardData, id, user }: IMembership = byMembershipId[curr];

      const {
        email,
        facebookUrl,
        firstName,
        lastName,
        instagramUrl,
        linkedInUrl,
        pictureUrl,
        twitterUrl
      } = byUserId[user] ?? ({} as IUser);

      const result: MemberCardData = {
        bio,
        email,
        expandedCardData:
          cardData?.map(({ questionId, ...value }) => {
            const { title, type } = byQuestionId[questionId] ?? {};
            return { ...value, title, type };
          }) ?? [],
        facebookUrl,
        firstName,
        highlightedValue: cardData && cardData[0]?.value,
        id,
        instagramUrl,
        lastName,
        linkedInUrl,
        pictureUrl,
        twitterUrl
      };

      const passedThroughFilter = Object.values(result).some((value: any) => {
        if (
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseSearchString)
        ) {
          return true;
        }

        if (Array.isArray(value)) {
          return value.some((element: any) =>
            element?.value?.toLowerCase().includes(lowerCaseSearchString)
          );
        }

        return false;
      });

      return passedThroughFilter ? [...acc, result] : acc;
    }, []);
  }, deepequal);

  return (
    <Masonry
      key={`${searchString}-${members?.length}`}
      className="s-directory-card-ctr"
      columnCount={6}
      columnGutter={16}
      items={members ?? []}
      overscanBy={5}
      render={MemberCard}
    />
  );
};
