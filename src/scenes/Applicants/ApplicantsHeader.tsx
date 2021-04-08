import React from 'react';

import MainHeader from '@containers/Main/MainHeader';
import Row from '@containers/Row/Row';
import { IMember, MemberStatus } from '@db/db.entities';
import useFind from '@gql/useFind';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const pendingMembersIds: string[] = useFind(IMember, {
    where: { communityId, status: 'Pending' }
  })?.map((pendingMember: IMember) => pendingMember.id);

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
