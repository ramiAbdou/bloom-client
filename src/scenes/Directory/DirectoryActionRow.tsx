import React, { useState } from 'react';

import Row from '@components/containers/Row/Row';
import SearchBar from '@components/molecules/SearchBar/SearchBar';
import ListFilterOpenButton from '@components/organisms/List/ListFilter/ListFilterOpenButton';
import ListQuickFilter from '@components/organisms/List/ListFilter/ListQuickFilter';
// import ListSearchBar from '@components/organisms/List/ListSearchBar';
import { IMember } from '@core/db/db.entities';
import { directorySearchStringVar } from './Directory.reactive';

const DirectoryQuickFilter: React.FC = () => {
  const filter = (member: Pick<IMember, 'role'>): boolean => !!member?.role;
  return <ListQuickFilter filter={filter} title="Admins Only" />;
};

const DirectorySearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (element: string): void => {
    directorySearchStringVar(element);
    setValue(element);
  };

  return <SearchBar className="w-100--m" value={value} onChange={onChange} />;
};

const DirectoryActionRow: React.FC = () => (
  <Row wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <DirectorySearchBar />
    <DirectoryQuickFilter />
    <ListFilterOpenButton className="ml-auto" />
  </Row>
);

export default DirectoryActionRow;
