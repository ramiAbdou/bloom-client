import React from 'react';

import Row from '@containers/Row/Row';
import { TableFilter, TableRow } from '@organisms/Table/Table.types';
import TableQuickFilter from '@organisms/Table/TableQuickFilter';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';

const MemberDatabaseInactiveFilter: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

  const duesStatusQuestionId: string = useStoreState(({ db }) => {
    return db.community.questions?.find((questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === QuestionCategory.DUES_STATUS;
    });
  });

  const filter: TableFilter = (row: TableRow) => {
    const isDuesActive: boolean = row[duesStatusQuestionId];
    return !isDuesActive;
  };

  return (
    <TableQuickFilter filter={filter} show={show} title="Hasn't Paid Dues" />
  );
};

const MemberDatabaseActiveFilter: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

  const duesStatusQuestionId: string = useStoreState(({ db }) => {
    return db.community.questions?.find((questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === QuestionCategory.DUES_STATUS;
    });
  });

  const filter: TableFilter = (row: TableRow) => {
    const isDuesActive: boolean = row[duesStatusQuestionId];
    return isDuesActive;
  };

  return <TableQuickFilter filter={filter} show={show} title="Paid Dues" />;
};

const MemberDatabaseQuickFilters: React.FC = () => {
  const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

  return (
    <Row wrap show={show} spacing="sm">
      <MemberDatabaseActiveFilter />
      <MemberDatabaseInactiveFilter />
    </Row>
  );
};

export default MemberDatabaseQuickFilters;
