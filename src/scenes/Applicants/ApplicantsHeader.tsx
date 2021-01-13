import React from 'react';

import { LoadingProps } from '@constants';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import { MainHeader } from '@containers/Main';
import { useStoreState } from '@store/Store';
import ApplicantsHeaderRespondAllButton from './ApplicantsRespondButton';

const ApplicantsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const pendingApplicantIds: string[] = useStoreState(({ db }) => {
    const { byId } = db.entities.members;
    return db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    });
  });

  const numApplicants: number = pendingApplicantIds?.length;
  const headerTag = !!numApplicants && `${numApplicants} Total`;

  return (
    <MainHeader
      className="s-applicants-header"
      headerTag={headerTag}
      loading={loading}
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
