import React, { ChangeEvent, memo, useEffect, useState } from 'react';

import Spinner from '@components/Loader/Spinner';
import SearchBar from '@components/Misc/SearchBar';
import { LoadingProps } from '@constants';
import { useStoreState } from '@store/Store';
import Directory from '../Directory.store';

export default memo(({ loading }: LoadingProps) => {
  const [value, setValue] = useState('');

  const numMembers = useStoreState(
    ({ entities }) => entities.members?.allIds?.length
  );

  const setSearchString = Directory.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const onClear = () => setValue('');

  return (
    <div className="s-home-header flex-acsb">
      <div>
        <h1 className="s-home-header-title">Directory</h1>
        {loading && <Spinner dark />}
      </div>

      {!loading && (
        <SearchBar
          placeholder={`Search ${numMembers} members...`}
          value={value}
          onChange={onChange}
          onClear={onClear}
        />
      )}
    </div>
  );
});
