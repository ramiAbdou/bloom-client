import React, { ChangeEvent, useEffect, useState } from 'react';

import HeaderTag from '@components/Elements/HeaderTag';
import SearchBar from '@components/Elements/SearchBar';
import Spinner from '@components/Loader/Spinner';
import { useStoreState } from '@store/Store';
import Directory from '../Directory.store';

const SearchContainer = () => {
  const [value, setValue] = useState('');
  const loading = Directory.useStoreState((store) => store.loading);

  const setSearchString = Directory.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  // Only show if not loading.
  if (loading) return null;

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setValue(target.value);

  const onClear = () => setValue('');

  return (
    <SearchBar
      placeholder="Search members..."
      value={value}
      onChange={onChange}
      onClear={onClear}
    />
  );
};

const HeaderText = () => {
  const numMembers = useStoreState(
    ({ db }) => db.entities.members?.allIds?.length
  );

  const loading = Directory.useStoreState((store) => store.loading);

  return (
    <div>
      <h1 className="s-home-header-title">Directory</h1>
      {!loading && <HeaderTag value={`${numMembers} Members`} />}
      {loading && <Spinner dark />}
    </div>
  );
};

export default () => (
  <div className="s-directory-header">
    <HeaderText />
    <SearchContainer />
  </div>
);
