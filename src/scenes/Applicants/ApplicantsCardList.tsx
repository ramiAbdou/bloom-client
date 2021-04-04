import React from 'react';

import { IMember, MemberStatus } from '@db/db.entities';
import { useStoreState } from '@store/Store';
import ApplicantCard from './ApplicantsCard';

const ApplicantsCardList: React.FC = () => {
  const applicantIds: string[] = useStoreState(({ db }) =>
    db.community.members?.filter((memberId: string) => {
      const member: IMember = db.byMemberId[memberId];
      return member?.status === MemberStatus.PENDING;
    })
  );

  if (!applicantIds?.length) return <p>There are no pending applicants. 👍</p>;

  return (
    <div className="g-md d-grid py-xxs rg-md s-applicants-card-ctr">
      {applicantIds.map((applicantId: string) => (
        <ApplicantCard key={applicantId} id={applicantId} />
      ))}
    </div>
  );
};

export default ApplicantsCardList;
