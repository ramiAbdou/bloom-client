import deepequal from 'fast-deep-equal';
import { Masonry } from 'masonic';
import { matchSorter } from 'match-sorter';
import React from 'react';

import { IMembership, IUser } from '@store/entities';
import { useStoreState } from '@store/Store';
import Directory from '../../Directory.store';
import MemberCard from './MemberCard';
import { MemberCardData } from './MemberCard.store';

const randomPictures = [
  'https://pbs.twimg.com/profile_images/1309512858951131138/8UACAdfa_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1303060784289730560/femQ8Zek_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1216728758473953281/HY15R6ER_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1322009883596726272/5lguqewe_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1285792980872429568/BkcFk2jp_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1289268330088595456/s-5tN4Oi_400x400.jpg'
];

export default () => {
  const searchString = Directory.useStoreState((store) => store.searchString);

  const members: MemberCardData[] = useStoreState(({ entities }) => {
    const { allIds, byId: byMembershipId } = entities.memberships;
    const { byId: byQuestionId } = entities.questions;
    const { byId: byUserId } = entities.users;

    if (!allIds?.length) return [];

    const unSortedResult: MemberCardData[] = allIds
      ?.filter((id: string) => byMembershipId[id]?.status === 'ACCEPTED')
      ?.map((curr: string) => {
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

        return {
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
          pictureUrl:
            randomPictures[Math.round(Math.random() * 6)] ?? pictureUrl,
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
      columnCount={6}
      columnGutter={16}
      items={members ?? []}
      overscanBy={5}
      render={MemberCard}
    />
  );
};
