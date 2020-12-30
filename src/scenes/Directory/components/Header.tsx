import React, { useEffect, useState } from 'react';

import SearchBar from '@components/Elements/SearchBar';
import Spinner from '@components/Loader/Spinner';
import NumberTag from '@components/Tags/NumberTag';
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

  return (
    <SearchBar
      placeholder="Search members..."
      value={value}
      onChange={setValue}
    />
  );
};

const HeaderText = () => {
  const loading = Directory.useStoreState((store) => store.loading);
  const numMembers = Directory.useStoreState((store) => store.numMembers);

  return (
    <div>
      <h1 className="s-home-header-title">Directory</h1>
      {!loading && <NumberTag value={`${numMembers} Members`} />}
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
