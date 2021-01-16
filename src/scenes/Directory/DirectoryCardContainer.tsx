import deepequal from 'fast-deep-equal';
import { Masonry } from 'masonic';
import { matchSorter } from 'match-sorter';
import React, { useEffect } from 'react';

import { IMember, IMemberData } from '@store/entities';
import { useStoreState } from '@store/Store';
import Directory from './Directory.store';
import DirectoryCard from './DirectoryCard/DirectoryCard';
import { MemberCardModel } from './DirectoryCard/DirectoryCard.store';

const DirectoryCardContainer = () => {
  const numMembers = Directory.useStoreState((store) => store.numMembers);
  const searchString = Directory.useStoreState((store) => store.searchString);

  const members: MemberCardModel[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;
    const { byId: byUserId } = db.entities.users;

    if (!db.community.members?.length) return [];

    const unSortedResult = db.community.members
      ?.map((memberId: string) => {
        const member: IMember = byMemberId[memberId];

        const data: IMemberData[] = member.data
          .map((dataId) => byDataId[dataId])
          ?.filter(
            (point: IMemberData) =>
              byQuestionId[point.question]?.inExpandedDirectoryCard
          );

        return { ...member, ...byUserId[member.user], data };
      })
      ?.filter((member) => member?.status === 'ACCEPTED');

    return !searchString
      ? unSortedResult
      : matchSorter(unSortedResult, searchString, {
          keys: [
            (item) => `${item.firstName} ${item.lastName}`,
            'firstName',
            'lastName',
            'email',
            'bio',
            (item) => item.data.map(({ value }) => value.toString())
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
