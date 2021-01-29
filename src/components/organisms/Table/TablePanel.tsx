import deepequal from 'fast-deep-equal';
import React from 'react';

import Form from '@organisms/Form/Form';
import { OnFormSubmit } from '@organisms/Form/Form.types';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Panel from '@organisms/Panel/Panel';
import { useStoreActions, useStoreState } from '@store/Store';
import Table from './Table.store';
import { OnRenameColumnProps, TableColumn } from './Table.types';
import TableSortButton from './TableSortButton';

const TablePanelRenameForm: React.FC<OnRenameColumnProps> = ({
  onRenameColumn
}) => {
  const panelId = useStoreState(({ panel }) => panel.id);
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const { id, title, version }: TableColumn = Table.useStoreState(
    ({ columns }) =>
      columns.find(({ id: columnId }) => columnId === panelId) ??
      ({} as TableColumn),
    deepequal
  );

  const updateColumn = Table.useStoreActions((store) => store.updateColumn);

  const onSubmit: OnFormSubmit = async ({ items }) => {
    // Only one form item, so just index first element.
    const columnName: string = items[0]?.value;

    // If the column name didn't change, don't send to backend.
    if (columnName === title) return;

    await onRenameColumn({
      column: { id, title: columnName, version },
      updateColumn
    });

    closePanel();
  };

  if (!onRenameColumn) return null;

  return (
    <Form onSubmit={onSubmit}>
      <FormItem id="TABLE_COLUMN" type="SHORT_TEXT" value={title} />
      <FormSubmitButton invisible />
    </Form>
  );
};

const TablePanel: React.FC<OnRenameColumnProps> = ({ onRenameColumn }) => {
  const panelId = useStoreState(({ panel }) => panel.id);

  // Panel ID is the same as the column ID, so there should be a column that
  // is present with the same ID.
  const isColumnFound: boolean = Table.useStoreState(
    ({ columns }) => !!columns.find((column) => column.id === panelId)
  );

  if (!isColumnFound) return null;

  return (
    <Panel
      align="BOTTOM_LEFT"
      className="c-table-col-panel"
      id={panelId}
      scrollId="c-table-ctr"
    >
      <TablePanelRenameForm onRenameColumn={onRenameColumn} />
      <TableSortButton direction="ASC" id={panelId} />
      <TableSortButton direction="DESC" id={panelId} />
    </Panel>
  );
};

export default TablePanel;
