import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import { IMembership } from '@store/entities';
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
  const storeFromFetch = useStoreActions((store) => store.storeFromFetch);

  const numApplicants = useStoreState(({ community, entities }) => {
    const { byId } = entities.memberships;
    return community?.memberships?.filter((membershipId: string) => {
      return byId[membershipId]?.status === 'PENDING';
    }).length;
  });

  const applicants: IMembership[] = useStoreState(({ entities, community }) => {
    const { byId: byMembership } = entities.memberships;
    const { byId: byQuestion } = entities.questions;

    return community.memberships?.reduce(
      (acc: IMembership[], membershipId: string) => {
        const membership = byMembership[membershipId];
        if (membership.status !== 'PENDING') return acc;

        return [
          ...acc,
          {
            ...membership,
            applicantData: membership.applicantData.map(
              ({ questionId, value }) => ({
                question: byQuestion[questionId],
                value
              })
            )
          }
        ];
      },
      []
    );
  });

  const { data, loading } = useQuery(GET_PENDING_APPLICATIONS);

  useEffect(() => {
    const result = data?.getApplicants;
    if (!result) return;

    storeFromFetch({
      data: { questions: result.application.questions, ...result },
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
