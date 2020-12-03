/**
 * @fileoverview Scene: Members
 * @author Rami Abdou
 */

import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import TableContent from '@components/Table/Table';
import Table, { tableModel } from '@components/Table/Table.store';
import { Column, Row } from '@components/Table/Table.types';
import { IMember, IMembershipQuestion } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { GET_DATABASE, RENAME_QUESTION } from '../../Database.gql';
import Database from '../../Database.store';
import AddMemberStore from '../Header/AddMember.store';
import { AddMemberModal } from '../Header/AddMemberButton';
import ActionRow from './ActionRow';

const MemberTable = () => {
  const allMembers: IMember[] = useStoreState(({ entities, community }) => {
    const { byId } = entities.members;
    return community.members?.map((memberId: string) => byId[memberId]);
  });
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const clearSelectedRows = Table.useStoreActions(
    (actions) => actions.clearSelectedRows
  );
  const updateColumn = Table.useStoreActions((store) => store.updateColumn);

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

  const [renameQuestion] = useMutation(RENAME_QUESTION);

  const onRenameColumn = async ({ title, id, version }: Column) => {
    const { error } = await renameQuestion({
      variables: { id, title, version }
    });

    if (error) showToast({ message: getGraphQLError(error), type: 'ERROR' });
    else updateColumn({ id, title, version: ++version });
  };

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

  const columns = useMemo(() => questions ?? [], [questions?.length]);

  if (loading || !questions?.length) return null;

  return (
    <>
      <Table.Provider runtimeModel={{ ...tableModel, columns }}>
        <ActionRow />
        <MemberTable />
      </Table.Provider>

      <AddMemberStore.Provider>
        <AddMemberModal />
      </AddMemberStore.Provider>
    </>
  );
};
