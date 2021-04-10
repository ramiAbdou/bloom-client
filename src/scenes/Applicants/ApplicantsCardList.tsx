import React from 'react';

import { IMember, MemberStatus } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import { useStoreState } from '@core/store/Store';
import ApplicantCard from './ApplicantsCard';

const ApplicantsCardList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: pendingMembers, loading } = useFindFull(IMember, {
    fields: ['createdAt', 'status'],
    where: { communityId, status: MemberStatus.PENDING }
  });

  if (loading) return null;

  if (!pendingMembers.length) {
    return <p>There are no pending applicants. 👍</p>;
  }

  return (
    <div className="g-md d-grid py-xxs rg-md s-applicants-card-ctr">
      {pendingMembers.map((pendingMember: IMember) => (
        <ApplicantCard key={pendingMember.id} id={pendingMember.id} />
      ))}
    </div>
  );
};

export default ApplicantsCardList;
