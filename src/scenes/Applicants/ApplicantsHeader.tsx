import React from 'react';

import MainHeader from '@components/containers/Main/MainHeader';
import Row from '@components/containers/Row/Row';
import { ComponentWithData, LoadingProps } from '@util/constants';
import { IMember, MemberStatus } from '@util/constants.entities';
import ApplicantsRespondButton from './ApplicantsRespondButton';

interface ApplicantsHeaderProps extends LoadingProps {
  applicants: IMember[];
}

const ApplicantsHeaderButtonList: ComponentWithData<IMember[]> = ({
  data: applicants
}) => {
  const pendingMembersIds: string[] = applicants?.map(
    (pendingMember: IMember) => pendingMember.id
  );

  return (
    <Row spacing="xs">
      <ApplicantsRespondButton
        all
        applicantIds={pendingMembersIds}
        response={MemberStatus.ACCEPTED}
      />

      <ApplicantsRespondButton
        all
        applicantIds={pendingMembersIds}
        response={MemberStatus.REJECTED}
      />
    </Row>
  );
};

const ApplicantsHeader: React.FC<ApplicantsHeaderProps> = ({
  applicants,
  loading
}) => {
  const applicantsCount: number = applicants?.length;

  return (
    <MainHeader
      headerTag={!!applicantsCount && `${applicantsCount} Total`}
      loading={loading}
      title="Pending Applicants"
    >
      <ApplicantsHeaderButtonList data={applicants} />
    </MainHeader>
  );
};

export default ApplicantsHeader;
