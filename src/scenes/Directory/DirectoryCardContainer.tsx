import deepequal from 'fast-deep-equal';
import { Masonry } from 'masonic';
import { matchSorter } from 'match-sorter';
import React, { useEffect } from 'react';

import { IMember, IUser } from '@store/entities';
import { useStoreState } from '@store/Store';
import Directory from './Directory.store';
import DirectoryCard from './DirectoryCard/DirectoryCard';
import { MemberCardModel } from './DirectoryCard/DirectoryCard.store';

const DirectoryCardContainer = () => {
  const numMembers = Directory.useStoreState((store) => store.numMembers);
  const searchString = Directory.useStoreState((store) => store.searchString);

  const members: MemberCardModel[] = useStoreState(({ db }) => {
    const { members: membersEntity, questions, users } = db.entities;
    const { allIds, byId: byMemberId } = membersEntity;
    const { byId: byQuestionId } = questions;
    const { byId: byUserId } = users;

    if (!allIds?.length) return [];

    const unSortedResult: MemberCardModel[] = db.community.members
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
            (item: MemberCardModel) => `${item.firstName} ${item.lastName}`,
            'firstName',
            'lastName',
            'email',
            'bio',
            (item: MemberCardModel) =>
              item.expandedCardData.map(({ value }) => value)
          ],
          threshold: matchSorter.rankings.ACRONYM
        });
  }, deepequal);

  const setNumMembers = Directory.useStoreActions(
    (store) => store.setNumMembers
  );

  useEffect(() => {
    const { length } = members ?? [];
    if (length !== numMembers) setNumMembers(length);
  }, [members?.length]);

  return (
    <Masonry
      key={`${searchString}-${members?.length}`}
      className="s-directory-card-ctr"
      columnGutter={16}
      items={members ?? []}
      overscanBy={5}
      render={DirectoryCard}
    />
  );
};

export default DirectoryCardContainer;
