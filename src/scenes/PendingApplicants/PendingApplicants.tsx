import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import ApplicantCard from './components/Card/ApplicantCard';
import Applicant, {
  applicantModel
} from './components/Card/ApplicantCard.store';
import Header from './components/Header/Header';
import { GET_PENDING_APPLICATIONS } from './PendingApplicants.gql';

const NoPendingApplicantsMessage = () => (
  <p>There are no pending applicants. 👍</p>
);

export default () => {
  const mergeEntities = useStoreActions((store) => store.mergeEntities);

  const numApplicants = useStoreState(({ community, entities }) => {
    const { byId } = entities.members;
    return community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    }).length;
  });

  const applicants: IMember[] = useStoreState(({ entities, community }) => {
    const { byId: byMember } = entities.members;
    const { byId: byQuestion } = entities.questions;

    return community.members?.reduce((acc: IMember[], memberId: string) => {
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
  });

  const { data, loading } = useQuery(GET_PENDING_APPLICATIONS);

  useEffect(() => {
    const result = data?.getApplicants;
    if (!result) return;

    mergeEntities({
      data: { questions: result.application.questions, ...result },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  const memoizedApplicants = useMemo(() => applicants, [numApplicants]);

  return (
    <div className="s-applicants">
      <Header loading={loading} />

      <div className="s-home-content">
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
    </div>
  );
};
