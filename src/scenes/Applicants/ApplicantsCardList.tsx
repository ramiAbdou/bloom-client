import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import useFind from '@core/gql/hooks/useFind';
import { IMember, MemberStatus } from '@util/db.entities';
import ApplicantCard from './ApplicantsCard';

const ApplicantsCardList: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: pendingMembers, loading } = useFind(IMember, {
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
