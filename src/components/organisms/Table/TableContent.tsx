import React, { useEffect, useState } from 'react';

import SelectAllBanner from './SelectAllBanner/SelectAllBanner';
import Table from './Table.store';
import { OnRenameColumnProps } from './Table.types';
import BodyContainer from './TableBodyContainer';
import HeaderContainer from './TableHeaderContainer';
import Pagination from './TablePagination/Pagination';
import TablePanel from './TablePanel';

const TableContent: React.FC<OnRenameColumnProps> = ({ onRenameColumn }) => {
  const [maxHeight, setMaxHeight] = useState(0);

  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  const { innerHeight } = window;

  useEffect(() => {
    // Takes into account both the window's innerHeight and whether or not
    // there is the selected banner showing.
    setMaxHeight(60 * 8 * (innerHeight / 710) - (isAllPageSelected ? 60 : 0));
  }, [isAllPageSelected, innerHeight]);

  return (
    <>
      {isAllPageSelected && <SelectAllBanner />}

      <div id="c-table-ctr" style={{ maxHeight }}>
        <table className="c-table">
          <HeaderContainer />
          <BodyContainer />
        </table>
      </div>

      <Pagination />
      <TablePanel onRenameColumn={onRenameColumn} />
    </>
  );
};

export default TableContent;
