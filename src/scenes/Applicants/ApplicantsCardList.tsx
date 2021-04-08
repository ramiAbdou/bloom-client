import React from 'react';

import { IMember } from '@db/db.entities';
import useFind from '@gql/useFind';
import { useStoreState } from '@store/Store';
import ApplicantCard from './ApplicantsCard';

const ApplicantsCardList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const pendingMembers: IMember[] = useFind(IMember, {
    fields: ['createdAt', 'status'],
    where: { communityId, status: 'Pending' }
  });

  if (!pendingMembers?.length) {
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
