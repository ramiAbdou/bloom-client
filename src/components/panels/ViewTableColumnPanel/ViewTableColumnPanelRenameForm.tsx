import React from 'react';

import Form, { OnFormSubmitFunction } from '@components/organisms/Form/Form';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { closePanel, panelVar } from '@components/organisms/Panel/Panel.state';
import { TableColumn } from '@components/organisms/Table/Table.types';
import { ViewTableColumnPanelMetadata } from './ViewTableColumnPanel.types';

const ViewTableColumnPanelRenameForm: React.FC = () => {
  const { columnId, tableState } = panelVar()
    ?.metadata as ViewTableColumnPanelMetadata;

  const { onRenameColumn } = tableState;

  const title: string = tableState.columns.find(
    (column: TableColumn) => column.id === columnId
  )?.title;

  if (!onRenameColumn) return null;

  const onSubmit: OnFormSubmitFunction = async ({ items }) => {
    // Only one form item, so just index first element.
    const updatedTitle: string = items.TABLE_COLUMN?.value as string;

    // If the column name didn't change, don't send to backend.
    if (updatedTitle === title) return;

    await onRenameColumn({ id: columnId, title: updatedTitle });

    closePanel();
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormShortText id="TABLE_COLUMN" value={title} />
      <FormSubmitButton invisible />
    </Form>
  );
};

export default ViewTableColumnPanelRenameForm;
