import deepequal from 'fast-deep-equal';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useCallback, useEffect } from 'react';

import TableContent from '@components/Table/Table';
import Table, { Column, Row, tableModel } from '@components/Table/Table.store';
import { IMember, IMembershipQuestion } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { GET_DATABASE, RENAME_QUESTION } from '../../Database.gql';
import Database from '../../Database.store';
import ActionRow from './ActionRow';

const MemberTable = () => {
  const allMembers: IMember[] = useStoreState(({ entities, community }) => {
    const { byId } = entities.members;
    return community.members?.map((memberId: string) => byId[memberId]);
  }, deepequal);

  const rows: Row[] = useStoreState(({ entities, community }) => {
    const { byId } = entities.members;
    return community.members?.reduce((acc: Row[], id: string) => {
      const { allData } = byId[id];
      const result = { id };

      allData.forEach(({ questionId, value }) => {
        result[questionId] = value;
      });

      return [...acc, result];
    }, []);
  }, deepequal);

  const updateData = Table.useStoreActions((actions) => actions.updateData);

  // Used primarily for the removal of members. This will not update the
  // data if the number of members doesn't change.
  useEffect(() => {
    if (rows) updateData(rows);
  }, [rows?.length]);

  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateColumn = Table.useStoreActions((store) => store.updateColumn);

  const [renameQuestion] = useMutation(RENAME_QUESTION);

  const onRenameColumn = useCallback(async ({ title, id, version }: Column) => {
    const { error } = await renameQuestion({
      variables: { id, title, version }
    });

    if (error) showToast({ message: getGraphQLError(error), type: 'ERROR' });
    else updateColumn({ id, title, version: ++version });
  }, []);

  if (!allMembers.length) return <p>You don't have any members! 🥴</p>;

  return <TableContent onRenameColumn={onRenameColumn} />;
};

export default () => {
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const currentLoading = Database.useStoreState((store) => store.loading);
  const setLoading = Database.useStoreActions((actions) => actions.setLoading);

  const questions: IMembershipQuestion[] = useStoreState(
    ({ community, entities }) => {
      const { byId } = entities.membershipQuestions;
      return community.membershipQuestions?.map((id: string) => byId[id]);
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

  if (loading || !questions?.length) return null;

  return (
    <Table.Provider runtimeModel={{ ...tableModel, columns: questions }}>
      <ActionRow />
      <MemberTable />
    </Table.Provider>
  );
};
