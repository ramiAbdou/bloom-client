import React from 'react';

import MainHeader from '@components/Main/Header';
import { useStoreState } from '@store/Store';
import { AcceptAllButton, IgnoreAllButton } from './Button';

const ApplicantsHeader = () => {
  const numApplicants: number = useStoreState(({ db }) => {
    const { byId } = db.entities.members;

    return db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    }).length;
  });

  const numberTag = !!numApplicants && `${numApplicants} Total`;

  return (
    <MainHeader numberTag={numberTag} title="Pending Applicants">
      {!!numApplicants && (
        <div>
          <AcceptAllButton />
          <IgnoreAllButton />
        </div>
      )}
    </MainHeader>
  );
};

export default ApplicantsHeader;
