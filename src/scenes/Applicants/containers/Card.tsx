import deepequal from 'fast-deep-equal';
import React from 'react';

import { IMember } from '@store/entities';
import { useStoreState } from '@store/Store';
import Applicants from '../Applicants.store';
import ApplicantCard from '../components/Card/Card';
import Applicant, { applicantModel } from '../components/Card/Card.store';

export default () => {
  const numApplicants = useStoreState(({ db }) => {
    const { byId } = db.entities.members;
    return db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    }).length;
  });

  const applicants: IMember[] = useStoreState(({ db }) => {
    const { members, questions } = db.entities;
    const { byId: byMember } = members;
    const { byId: byQuestion } = questions;

    return db.community.members?.reduce((acc: IMember[], memberId: string) => {
      const member = byMember[memberId];
      if (member.status !== 'PENDING') return acc;

      return [
        ...acc,
        {
          ...member,
          applicantData: member.applicantData.map(({ questionId, value }) => ({
            question: byQuestion[questionId],
            value
          }))
        }
      ];
    }, []);
  }, deepequal);

  const loading = Applicants.useStoreState((store) => store.loading);

  if (loading) return null;

  return (
    <div className="s-home-content">
      {!numApplicants && <p>There are no pending applicants. 👍</p>}

      <div className="s-applicants-card-ctr">
        {applicants?.map((applicant: IMember) => (
          <Applicant.Provider
            key={applicant.id}
            runtimeModel={{ ...applicantModel, applicant }}
          >
            <ApplicantCard />
          </Applicant.Provider>
        ))}
      </div>
    </div>
  );
};
