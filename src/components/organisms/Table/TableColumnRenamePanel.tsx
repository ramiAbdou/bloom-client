import React from 'react';

import Form from '@organisms/Form/Form';
import { OnFormSubmit } from '@organisms/Form/Form.types';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreActions, useStoreState } from '@store/Store';
import FormShortText from '../Form/FormShortText';
import TableStore from './Table.store';
import TableSortButton from './TableSortButton';

const TableColumnRenameForm: React.FC = () => {
  const panelId = useStoreState(({ panel }) => panel.id);
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const id: string = TableStore.useStoreState(({ columns }) => {
    return columns.find(({ id: columnId }) => columnId === panelId)?.id;
  });

  const title: string = TableStore.useStoreState(({ columns }) => {
    return columns.find(({ id: columnId }) => columnId === panelId)?.title;
  });

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

const TableColumnRenamePanel: React.FC = () => {
  return (
    <>
      <TableColumnRenameForm />
      <TableSortButton direction="ASC" />
      <TableSortButton direction="DESC" />
    </>
  );
};

export default TableColumnRenamePanel;
