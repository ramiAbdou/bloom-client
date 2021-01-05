import React from 'react';

import { useStoreState } from '@store/Store';
import ActionContainer from '@templates/ActionContainer/ActionContainer';
import MainHeader from '@templates/Main/Header';
import ApplicantsHeaderRespondAllButton from './ApplicantsRespondButton';

const ApplicantsHeader = () => {
  const pendingApplicantIds: string[] = useStoreState(({ db }) => {
    const { byId } = db.entities.members;
    return db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    });
  });

  const numApplicants: number = pendingApplicantIds?.length;
  const numberTag = !!numApplicants && `${numApplicants} Total`;

  return (
    <MainHeader
      className="s-applicants-header"
      numberTag={numberTag}
      title="Pending Applicants"
    >
      <ActionContainer>
        <ApplicantsHeaderRespondAllButton
          all
          applicantIds={pendingApplicantIds}
          response="ACCEPTED"
        />

        <ApplicantsHeaderRespondAllButton
          all
          applicantIds={pendingApplicantIds}
          response="REJECTED"
        />
      </ActionContainer>
    </MainHeader>
  );
};

export default ApplicantsHeader;
