import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import FormShortText from '../Form/FormShortText';
import TableStore from './Table.store';
import { RenameColumnFunction, TableColumn } from './Table.types';

const TableColumnPanelRenameForm: React.FC = () => {
  const columnId: string = useStoreState(({ panel }) => {
    return panel.metadata;
  });

  const title: string = TableStore.useStoreState(({ columns }) => {
    const result: TableColumn = columns.find((column: TableColumn) => {
      return column.id === columnId;
    });

    return result?.title;
  });

  const onRenameColumn: RenameColumnFunction = TableStore.useStoreState(
    ({ options }) => {
      return options.onRenameColumn;
    }
  );

  const updateColumn: ActionCreator<
    Partial<TableColumn>
  > = TableStore.useStoreActions((state) => {
    return state.updateColumn;
  });

  const onSubmit: OnFormSubmitFunction = async ({ closePanel, items }) => {
    // Only one form item, so just index first element.
    const updatedTitle: string = items.TABLE_COLUMN?.value as string;

    // If the column name didn't change, don't send to backend.
    if (updatedTitle === title) return;

    await onRenameColumn({
      column: { id: columnId, title: updatedTitle },
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

export default TableColumnPanelRenameForm;
