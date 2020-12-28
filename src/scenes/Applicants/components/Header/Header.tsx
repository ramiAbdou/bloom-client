import React from 'react';

import HeaderTag from '@components/Elements/HeaderTag';
import Spinner from '@components/Loader/Spinner';
import { useStoreState } from '@store/Store';
import Applicants from '../../Applicants.store';
import { AcceptAllButton, IgnoreAllButton } from './Button';

export default () => {
  const numApplicants: number = useStoreState(({ db }) => {
    const { byId } = db.entities.members;

    return db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    }).length;
  });

  const loading = Applicants.useStoreState((store) => store.loading);

  return (
    <div className="s-home-header s-applicants-header">
      <div>
        <h1 className="s-home-header-title">Pending Applicants</h1>
        {!loading && !!numApplicants && (
          <HeaderTag value={`${numApplicants} Total`} />
        )}
        {loading && <Spinner dark />}
      </div>

      {!!numApplicants && (
        <div>
          <AcceptAllButton />
          <IgnoreAllButton />
        </div>
      )}
    </div>
  );
};
