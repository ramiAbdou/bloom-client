import React from 'react';

// import Row from '@containers/Row/Row';
// import { IQuestion } from '@db/db.entities';
// import useFindOne from '@gql/hooks/useFindOne';
// import { TableRow } from '@organisms/Table/Table.types';
// import { TableFilterFunction } from '@organisms/Table/TableFilterPanel/TableFilterPanel.types';
// import TableQuickFilter from '@organisms/Table/TableQuickFilter';
// import { useStoreState } from '@store/Store';
// import { QuestionCategory } from '@util/constants';

// const MemberDatabaseInactiveFilter: React.FC = () => {
//   const communityId: string = useStoreState(({ db }) => db.communityId);
//   const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

//   const { id: duesStatusQuestionId } = useFindOne(IQuestion, {
//     where: { category: QuestionCategory.DUES_STATUS, communityId }
//   });

//   const filter: TableFilterFunction = (row: TableRow) => {
//     const isDuesActive: boolean = row[duesStatusQuestionId];
//     return !isDuesActive;
//   };

//   return (
//     <TableQuickFilter filter={filter} show={show} title="Hasn't Paid Dues" />
//   );
// };

// const MemberDatabaseActiveFilter: React.FC = () => {
//   const communityId: string = useStoreState(({ db }) => db.communityId);
//   const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

//   const { id: duesStatusQuestionId } = useFindOne(IQuestion, {
//     where: { category: QuestionCategory.DUES_STATUS, communityId }
//   });

//   const filter: TableFilterFunction = (row: TableRow) => {
//     const isDuesActive: boolean = row[duesStatusQuestionId];
//     return isDuesActive;
//   };

//   return <TableQuickFilter filter={filter} show={show} title="Paid Dues" />;
// };

// const MemberDatabaseQuickFilters: React.FC = () => {
//   const show: boolean = useStoreState(({ db }) => db.community.canCollectDues);

//   return (
//     <Row wrap show={show} spacing="sm">
//       <MemberDatabaseActiveFilter />
//       <MemberDatabaseInactiveFilter />
//     </Row>
//   );
// };

const MemberDatabaseQuickFilters: React.FC = () => null;

export default MemberDatabaseQuickFilters;
