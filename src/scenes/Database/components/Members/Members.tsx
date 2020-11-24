/**
 * @fileoverview Scene: Members
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import TableContent from '@components/Table/Table';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { IApplicationQuestion, IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_DATABASE } from '../../Database.gql';
import ActionRow from './ActionRow';

const DatabaseTable = () => {
  const questions: IApplicationQuestion[] = useStoreState(
    ({ community, entities }) => {
      const { byId } = entities.membershipQuestions;
      return community.membershipQuestions?.map(
        (questionId: string) => byId[questionId]
      );
    }
  );

  const allMembers: IMember[] = useStoreState(({ entities, community }) => {
    const { byId } = entities.members;
    return community.members?.map((memberId: string) => byId[memberId]);
  });

  const data = useMemo(
    () =>
      !allMembers
        ? []
        : allMembers.reduce((acc: Row[], { id, allData }: IMember) => {
            const result = { id };
            allData.forEach(({ questionId, value }) => {
              result[questionId] = value;
            });

            return [...acc, result];
          }, []),
    [allMembers?.length]
  );

  // console.log(data);

  const columns = useMemo(
    () =>
      !questions
        ? []
        : questions.map(({ category, type, id, title }) => ({
            category,
            id,
            title,
            type
          })),
    [questions?.length]
  );

  if (!questions?.length) return null;
  if (!data.length) return <p>You don't have any members! 🥴</p>;

  return (
    <Table.Provider initialData={{ columns, data }}>
      <ActionRow />
      <TableContent />
    </Table.Provider>
  );
};

export default () => {
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const { data, loading } = useQuery(GET_DATABASE);

  useEffect(() => {
    if (data?.getDatabase)
      updateEntities({
        data: {
          ...data.getDatabase,
          members: data.getDatabase.memberships,
          membershipQuestions: data.getDatabase.questions
        },
        schema: Schema.COMMUNITY
      });
  }, [data]);

  return <DatabaseTable />;
};
