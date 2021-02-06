import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilter, TableRow } from '@organisms/Table/Table.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const MemberDatabaseInactiveFilter: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

  const duesStatusQuestionId: string = useStoreState(({ db }) => {
    return db.community.questions?.find((questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === 'DUES_STATUS';
    });
  });

  const filter: TableFilter = (row: TableRow) => {
    return row[duesStatusQuestionId] === 'Inactive';
  };

  return (
    <TableQuickFilter
      filter={filter}
      id="FILTER_DUES_INACTIVE"
      show={show}
      title="Hasn't Paid Dues"
    />
  );
};

const MemberDatabaseActiveFilter: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

  const duesStatusQuestionId: string = useStoreState(({ db }) => {
    return db.community.questions?.find((questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === 'DUES_STATUS';
    });
  });

  const filter: TableFilter = (row: TableRow) => {
    return row[duesStatusQuestionId] === 'Active';
  };

  return (
    <TableQuickFilter
      filter={filter}
      id="FILTER_DUES_ACTIVE"
      show={show}
      title="Paid Dues"
    />
  );
};

const MemberDatabaseQuickFilters: React.FC = () => {
  return (
    <Row wrap spacing="xs">
      <p className="meta">Quick Filters:</p>
      <MemberDatabaseActiveFilter />
      <MemberDatabaseInactiveFilter />
    </Row>
  );
};

export default MemberDatabaseQuickFilters;
