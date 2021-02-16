import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import ListFilterStore from './ListFilter.store';
// import IdStore from '@store/Id.store';
// import TableFilterStore from './TableFilter.store';
// import TableFilterActions from './TableFIlterActions';
// import TableFilterAddButton from './TableFilterAddButton';
// import TableFilterClearButton from './TableFilterClearButton';
// import TableFilterRow from './TableFilterRow';
import ListFilterQuestionList from './ListFilterQuestionList';

// const ListFilterHeader: React.FC = () => {
//   return (
//     <Row spaceBetween className="mb-sm">
//       <h3>Filters</h3>
//       <TableFilterClearButton />
//     </Row>
//   );
// };

// const ListFilterRows: React.FC = () => {
//   const filterIds: string[] = TableFilterStore.useStoreState((store) => {
//     return store.filterIds;
//   });

//   return (
//     <ul className="mb-sm">
//       {filterIds.map((id: string) => {
//         return (
//           <IdStore.Provider key={id} runtimeModel={{ id }}>
//             <TableFilterRow />
//           </IdStore.Provider>
//         );
//       })}
//     </ul>
//   );
// };

const ListFilterHeader: React.FC = () => {
  return (
    <Row className="mx-xs my-sm" justify="sb">
      <h3>Filters</h3>
      <Button tertiary>Clear Filters</Button>
    </Row>
  );
};

const ListFilterAddButton: React.FC = () => {
  return (
    <Row className="mx-xs my-sm">
      <Button primary>Apply Filters</Button>

      <Button secondary>Cancel</Button>
    </Row>
  );
};

const ListFilter: React.FC = () => {
  return (
    <ListFilterStore.Provider>
      <ListFilterHeader />
      <ListFilterQuestionList />
      <ListFilterAddButton />
      {/* <ListFilterHeader />
      <ListFilterRows />
      <TableFilterAddButton />
      <TableFilterActions /> */}
    </ListFilterStore.Provider>
  );
};

export default ListFilter;
