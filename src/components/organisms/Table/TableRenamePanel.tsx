import deepequal from 'fast-deep-equal';
import React from 'react';

import Form from '@organisms/Form/Form';
import { OnFormSubmit } from '@organisms/Form/Form.types';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreActions, useStoreState } from '@store/Store';
import FormShortText from '../Form/FormShortText';
import TableStore from './Table.store';
import { TableColumn } from './Table.types';
import TableSortButton from './TableSortButton';

const TableRenameForm: React.FC = () => {
  const columnId = useStoreState(({ panel }) => panel.metadata);
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const { id, title }: TableColumn = TableStore.useStoreState(({ columns }) => {
    return columns.find((column) => column.id === columnId) ?? {};
  }, deepequal);

  const onRenameColumn = TableStore.useStoreState(({ options }) => {
    return options.onRenameColumn;
  });

  const updateColumn = TableStore.useStoreActions(
    (store) => store.updateColumn
  );

  const onSubmit: OnFormSubmit = async ({ items }) => {
    // Only one form item, so just index first element.
    const updatedTitle: string = items.TABLE_COLUMN?.value;

    // If the column name didn't change, don't send to backend.
    if (updatedTitle === title) return;

    await onRenameColumn({
      column: { id, title: updatedTitle },
      updateColumn
    });

    closePanel();
  };

  return (
    <Form show={!!onRenameColumn} onSubmit={onSubmit}>
      <FormShortText id="TABLE_COLUMN" value={title} />
      <FormSubmitButton invisible />
    </Form>
  );
};

const TableRenamePanel: React.FC = () => {
  return (
    <>
      <TableRenameForm />
      <TableSortButton direction="ASC" />
      <TableSortButton direction="DESC" />
    </>
  );
};

export default TableRenamePanel;
