import MainHeader from 'core/templates/Main/Header';
import React from 'react';

import { useStoreState } from '@store/Store';
import ActionContainer from '@templates/ActionContainer/ActionContainer';
import ApplicantsHeaderRespondAllButton from './RespondAllButton';

const ApplicantsHeader = () => {
  const numApplicants: number = useStoreState(({ db }) => {
    const { byId } = db.entities.members;

    return db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    }).length;
  });

  const numberTag = !!numApplicants && `${numApplicants} Total`;

  return (
    <MainHeader
      className="s-applicants-header"
      numberTag={numberTag}
      title="Pending Applicants"
    >
      <ActionContainer>
        <ApplicantsHeaderRespondAllButton response="ACCEPTED" />
        <ApplicantsHeaderRespondAllButton response="REJECTED" />
      </ActionContainer>
    </MainHeader>
  );
};

export default ApplicantsHeader;
