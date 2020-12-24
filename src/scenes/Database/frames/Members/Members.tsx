import deepequal from 'fast-deep-equal';
import React from 'react';

import TableContent from '@components/Table/Content';
import Table from '@components/Table/Table';
import { Column, OnRenameColumn, Row } from '@components/Table/Table.types';
import useMutation from '@hooks/useMutation';
import { IMember, IQuestion } from '@store/entities';
import Loading from '@store/Loading.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { RENAME_QUESTION, RenameQuestionArgs } from '../../Database.gql';
import ActionRow from './ActionRow';

export default () => {
  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: Row[] = useStoreState(({ db }) => {
    const { community } = db;
    const { byId } = db.entities.members;

    return community.members?.reduce((acc: Row[], id: string) => {
      const result: Row = { id };
      const { allData, status }: IMember = byId[id];

      if (['REJECTED', 'PENDING'].includes(status) || !allData) return acc;

      allData.forEach(({ questionId, value }) => {
        result[questionId] = value;
      });

      return [...acc, result];
    }, []);
  }, deepequal);

  const columns: Column[] = useStoreState(({ db }) => {
    const { byId } = db.entities.questions;
    return db.community.questions?.map((id: string) => byId[id]);
  });

  const loading = Loading.useStoreState((store) => store.loading);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [renameQuestion] = useMutation<IQuestion, RenameQuestionArgs>({
    name: 'renameQuestion',
    query: RENAME_QUESTION
  });

  if (loading || !columns?.length) return null;

  const onRenameColumn: OnRenameColumn = async ({ column, updateColumn }) => {
    const { title, id, version } = column;

    // We pass in the version to check for race conditions.
    const { error } = await renameQuestion({ id, title, version });

    if (error) showToast({ message: error, type: 'ERROR' });
    else updateColumn({ id, title, version: version + 1 });
  };

  return (
    <Table select columns={columns} rows={rows} onRenameColumn={onRenameColumn}>
      <ActionRow />
      <TableContent />
    </Table>
  );
};