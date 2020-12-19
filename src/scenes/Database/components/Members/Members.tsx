import React from 'react';

import Table, { tableModel } from '@components/Table/Table.store';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import Database from '../../Database.store';
import ActionRow from './ActionRow';
import MemberTable from './Table';

export default () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId } = db.entities.questions;
    return db.community.questions?.map((id: string) => byId[id]);
  });

  const loading = Database.useStoreState((store) => store.loading);

  if (loading || !questions?.length) return null;

  return (
    <Table.Provider runtimeModel={{ ...tableModel, columns: questions }}>
      <ActionRow />
      <MemberTable />
    </Table.Provider>
  );
};
