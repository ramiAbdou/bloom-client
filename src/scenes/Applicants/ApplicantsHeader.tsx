import React from 'react';

import MainHeader from '@containers/Main/MainHeader';
import Row from '@containers/Row/Row';
import { IMember, MemberStatus } from '@store/Db/Db.entities';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const pendingApplicantIds: string[] = useStoreState(({ db }) =>
    db.community?.members?.filter((memberId: string) => {
      const member: IMember = db.byMemberId[memberId];
      return member?.status === MemberStatus.PENDING;
    })
  );

  const applicantsCount: number = pendingApplicantIds?.length;

  return (
    <MainHeader
      headerTag={!!applicantsCount && `${applicantsCount} Total`}
      loading={loading}
      title="Pending Applicants"
    >
      <Row spacing="xs">
        <ApplicantsRespondButton
          all
          applicantIds={pendingApplicantIds}
          response={MemberStatus.ACCEPTED}
        />

        <ApplicantsRespondButton
          all
          applicantIds={pendingApplicantIds}
          response={MemberStatus.REJECTED}
        />
      </Row>
    </MainHeader>
  );
};

export default ApplicantsHeader;
