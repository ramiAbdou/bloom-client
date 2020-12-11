import React, { memo } from 'react';

import Spinner from '@components/Loader/Spinner';
import { LoadingProps } from '@constants';
import { useStoreState } from '@store/Store';
import { AcceptAllButton, IgnoreAllButton } from './HeaderButton';

export default memo(({ loading }: LoadingProps) => {
  const title = useStoreState(({ db }) => {
    const { byId } = db.entities.members;

    const length = db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    }).length;

    let result = 'Pending Applicants';
    if (length) result += ` (${length})`;
    return result;
  });

  return (
    <div className="s-home-header s-applicants-header">
      <div>
        <h1 className="s-home-header-title">{title}</h1>
        {loading && <Spinner dark />}
      </div>

      <div>
        <AcceptAllButton />
        <IgnoreAllButton />
      </div>
    </div>
  );
});
