import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import MainHeader from '@components/containers/Main/MainHeader';
import Row from '@components/containers/Row/Row';
import useFind from '@core/gql/hooks/useFind';
import { LoadingProps } from '@util/constants';
import { IMember, MemberStatus } from '@util/constants.entities';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const communityId: string = useReactiveVar(communityIdVar);

  const pendingMembersIds: string[] = useFind(IMember, {
    where: { communityId, status: MemberStatus.PENDING }
  })?.data?.map((pendingMember: IMember) => pendingMember.id);

  const pendingMembersCount: number = pendingMembersIds?.length;

  return (
    <MainHeader
      headerTag={!!pendingMembersCount && `${pendingMembersCount} Total`}
      loading={loading}
      title="Pending Applicants"
    >
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
    </MainHeader>
  );
};

export default ApplicantsHeader;
