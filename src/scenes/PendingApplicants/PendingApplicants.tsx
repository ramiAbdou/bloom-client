import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import { IPendingApplicant } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import ApplicantCard from './components/ApplicantCard/ApplicantCard';
import Applicant, {
  applicantModel
} from './components/ApplicantCard/ApplicantCard.store';
import Header from './components/Header/Header';
import { GET_PENDING_APPLICATIONS } from './PendingApplicants.gql';

const NoPendingApplicantsMessage = () => (
  <p>There are no pending applicants. 👍</p>
);

export default () => {
  const updateEntities = useStoreActions((actions) => actions.updateEntities);

  const numApplicants = useStoreState(
    ({ community }) => community?.pendingApplicants?.length
  );

  const applicants: IPendingApplicant[] = useStoreState(
    ({ entities, community }) => {
      const { byId: byApplicationQuestion } = entities.questions;
      const { byId: byApplicant } = entities.pendingApplicants;

      return community.pendingApplicants?.map((applicantId: string) => {
        const applicant = byApplicant[applicantId];

        if (applicant.applicantData[0]?.questionId) {
          applicant.applicantData = applicant.applicantData.map(
            ({ questionId, value }) => ({
              question: byApplicationQuestion[questionId],
              value
            })
          );
        }

        return applicant;
      });
    }
  );

  const { data, loading } = useQuery(GET_PENDING_APPLICATIONS);

  useEffect(() => {
    if (!data?.getApplicants) return;

    updateEntities({
      data: {
        ...data.getApplicants,
        questions: data.getApplicants.application.questions
      },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  const memoizedApplicants = useMemo(() => applicants, [numApplicants]);

  return (
    <div className="s-applicants">
      <Header loading={loading} />
      {data && !numApplicants && <NoPendingApplicantsMessage />}

      <div className="s-applicants-card-ctr">
        {memoizedApplicants?.map((applicant) => (
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
