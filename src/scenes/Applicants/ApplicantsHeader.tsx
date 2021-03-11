import React from 'react';

import MainHeader from '@containers/Main/MainHeader';
import Row from '@containers/Row/Row';
import { MemberStatus } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const pendingApplicantIds: string[] = useStoreState(({ db }) => {
    return db.community?.members?.filter((memberId: string) => {
      return db.byMemberId[memberId]?.status === MemberStatus.PENDING;
    });
  });

  const numApplicants: number = pendingApplicantIds?.length;
  const headerTag: string = !!numApplicants && `${numApplicants} Total`;

  return (
    <MainHeader
      headerTag={headerTag}
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
