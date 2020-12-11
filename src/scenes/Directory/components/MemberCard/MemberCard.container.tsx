import deepequal from 'fast-deep-equal';
import { Masonry } from 'masonic';
import { matchSorter } from 'match-sorter';
import React from 'react';

import { IMember, IUser } from '@store/entities';
import { useStoreState } from '@store/Store';
import Directory from '../../Directory.store';
import MemberCard from './MemberCard';
import { MemberCardData } from './MemberCard.store';

export default () => {
  const searchString = Directory.useStoreState((store) => store.searchString);

  const members: MemberCardData[] = useStoreState(({ db }) => {
    const { members: membersEntity, questions, users } = db.entities;
    const { allIds, byId: byMemberId } = membersEntity;
    const { byId: byQuestionId } = questions;
    const { byId: byUserId } = users;

    if (!allIds?.length) return [];

    const unSortedResult: MemberCardData[] = allIds
      ?.filter((id: string) => byMemberId[id]?.status === 'ACCEPTED')
      ?.map((curr: string) => {
        const { bio, cardData, id, user }: IMember = byMemberId[curr];

        const {
          currentLocation,
          email,
          facebookUrl,
          firstName,
          lastName,
          instagramUrl,
          linkedInUrl,
          pictureUrl,
          twitterUrl
        } = byUserId[user] ?? ({} as IUser);

        return {
          bio,
          currentLocation,
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
      });

    return !searchString
      ? unSortedResult
      : matchSorter(unSortedResult, searchString, {
          keys: [
            (item: MemberCardData) => `${item.firstName} ${item.lastName}`,
            'firstName',
            'lastName',
            'email',
            'bio',
            (item: MemberCardData) =>
              item.expandedCardData.map(({ title }) => title)
          ],
          threshold: matchSorter.rankings.ACRONYM
        });
  }, deepequal);

  return (
    <Masonry
      key={`${searchString}-${members?.length}`}
      className="s-directory-card-ctr"
      columnGutter={16}
      items={members ?? []}
      overscanBy={5}
      render={MemberCard}
    />
  );
};
