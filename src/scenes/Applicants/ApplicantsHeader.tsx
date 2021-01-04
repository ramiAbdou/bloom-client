import MainHeader from 'core/templates/Main/Header';
import React from 'react';

import { useStoreState } from '@store/Store';
import ActionContainer from '@templates/ActionContainer/ActionContainer';
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
          applicantIds={pendingApplicantIds}
          response="ACCEPTED"
        />

        <ApplicantsHeaderRespondAllButton
          applicantIds={pendingApplicantIds}
          response="REJECTED"
        />
      </ActionContainer>
    </MainHeader>
  );
};

export default ApplicantsHeader;
