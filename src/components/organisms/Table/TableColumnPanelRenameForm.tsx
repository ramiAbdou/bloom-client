import React from 'react';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { useStoreState } from '@core/store/Store';
import { useTableState } from './Table.state';
import { TableState } from './Table.types';

const TableColumnPanelRenameForm: React.FC = () => {
  const { options }: TableState = useTableState();
  const columnId: string = useStoreState(({ panel }) => panel.metadata);
  // const updateColumn = useTableUpdateColumn();

  // const title: string = TableStore.useStoreState(({ columns }) => {
  //   const result: TableColumn = columns.find(
  //     (column: TableColumn) => column.id === columnId
  //   );

  //   return result?.title;
  // });

  // const updateColumn: ActionCreator<
  //   Partial<TableColumn>
  // > = TableStore.useStoreActions((state) => state.updateColumn);

  const onSubmit: OnFormSubmitFunction = async ({ closePanel, items }) => {
    // Only one form item, so just index first element.
    const updatedTitle: string = items.TABLE_COLUMN?.value as string;

    // If the column name didn't change, don't send to backend.
    // if (updatedTitle === title) return;

    // await onRenameColumn({
    //   column: { id: columnId, title: updatedTitle },
    //   updateColumn
    // });

    closePanel();
  };

  return (
    <Form show={!!options.onRenameColumn} onSubmit={onSubmit}>
      {/* <FormShortText id="TABLE_COLUMN" value={title} /> */}
      <FormSubmitButton invisible />
    </Form>
  );
};

export default TableColumnPanelRenameForm;
