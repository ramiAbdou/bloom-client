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
import Database from '../../Database.store';
import ActionRow from './ActionRow';

const MemberTable = () => {
  const allMembers: IMember[] = useStoreState(({ entities, community }) => {
    const { byId } = entities.members;
    return community.members?.map((memberId: string) => byId[memberId]);
  });

  const clearSelectedRows = Table.useStoreActions(
    (actions) => actions.clearSelectedRows
  );
  const updateData = Table.useStoreActions((actions) => actions.updateData);

  // Used primarily for the removal of members. This will not update the
  // data if the number of members doesn't change.
  useEffect(() => {
    const data = allMembers.reduce((acc: Row[], { id, allData }: IMember) => {
      const result = { id };
      allData.forEach(({ questionId, value }) => {
        result[questionId] = value;
      });

      return [...acc, result];
    }, []);

    updateData(data);
    clearSelectedRows();
  }, [allMembers?.length]);

  if (!allMembers.length) return <p>You don't have any members! 🥴</p>;

  return (
    <>
      <ActionRow />
      <TableContent />
    </>
  );
};

export default () => {
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const currentLoading = Database.useStoreState((store) => store.loading);
  const setLoading = Database.useStoreActions((actions) => actions.setLoading);

  const questions: IApplicationQuestion[] = useStoreState(
    ({ community, entities }) => {
      const { byId } = entities.membershipQuestions;
      return community.membershipQuestions?.map(
        (questionId: string) => byId[questionId]
      );
    }
  );

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

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

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

  if (loading || !questions?.length) return null;

  return (
    <Table.Provider initialData={columns}>
      <MemberTable />
    </Table.Provider>
  );
};
