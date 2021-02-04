import React from 'react';

import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ApplicantCard from './ApplicantsCard';

const ApplicantsCardList: React.FC = () => {
  const applicantIds: string[] = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;

    return db.community.members?.filter(
      (memberId: string) => byMemberId[memberId]?.status === 'PENDING'
    );
  });

  if (!applicantIds?.length) return <p>There are no pending applicants. 👍</p>;

  return (
    <div className="s-applicants-card-ctr">
      {applicantIds?.map((applicantId: string) => (
        <IdStore.Provider key={applicantId} runtimeModel={{ id: applicantId }}>
          <ApplicantCard />
        </IdStore.Provider>
      ))}
    </div>
  );
};

export default ApplicantsCardList;
