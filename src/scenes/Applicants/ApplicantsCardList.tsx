import React from 'react';

import { IMember } from '@util/constants.entities';
import ApplicantsCard from './ApplicantsCard';

interface ApplicantsCardListProps {
  applicants: IMember[];
}

const ApplicantsCardList: React.FC<ApplicantsCardListProps> = ({
  applicants
}) => {
  if (!applicants.length) {
    return <p>There are no pending applicants. 👍</p>;
  }

  return (
    <ul className="g-md d-grid py-xxs rg-md s-applicants-card-ctr">
      {applicants.map((applicant: IMember) => (
        <ApplicantsCard key={applicant.id} data={applicant} />
      ))}
    </ul>
  );
};

export default ApplicantsCardList;
