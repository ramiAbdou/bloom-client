import { TableDispatch, TableState } from '../../organisms/Table/Table.types';

export interface ViewTableColumnPanelMetadata {
  columnId: string;
  tableDispatch: TableDispatch;
  tableState: TableState;
}
