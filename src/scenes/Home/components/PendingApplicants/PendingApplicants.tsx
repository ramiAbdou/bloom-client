/**
 * @fileoverview Scene: PendingApplications
 * @author Rami Abdou
 */

import './PendingApplicants.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import {
  Community,
  IPendingApplicant,
  ResolvedApplicantData,
  UnresolvedApplicantData
} from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PENDING_APPLICATIONS } from '../../Home.gql';
import Applicant from './components/ApplicantCard/Applicant.store';
import ApplicantCard from './components/ApplicantCard/ApplicantCard';
import Header from './components/Header';

const NoPendingApplicantsMessage = () => (
  <p>There are no pending applications. 👍</p>
);

export default () => {
  const updateEntities = useStoreActions((store) => store.updateEntities);
  const numApplicants = useStoreState(
    ({ community }) => community?.pendingApplicants?.length
  );

  const applicants: IPendingApplicant[] = useStoreState(
    ({ applicationQuestions, pendingApplicants, community }) => {
      return community.pendingApplicants?.map((applicantId: string) => {
        const applicant = pendingApplicants.byId[applicantId];

        // @ts-ignore b/c we are simply checking if the data is resolved or not.
        if (applicant.applicantData[0]?.questionId)
          applicant.applicantData = (applicant.applicantData as UnresolvedApplicantData[]).map(
            ({ questionId, value }) => ({
              question: applicationQuestions.byId[questionId],
              value
            })
          ) as ResolvedApplicantData[];

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
        applicationQuestions: data.getApplicants.application.questions
      },
      schema: Community
    });
  }, [data]);

  const memoizedApplicants = useMemo(() => applicants, [numApplicants]);

  return (
    <div className="s-applicants">
      <Header loading={loading} />
      {data && !numApplicants && <NoPendingApplicantsMessage />}

      <div className="s-applicants-card-ctr">
        {memoizedApplicants?.map((applicant) => (
          <Applicant.Provider key={applicant.id} initialData={applicant}>
            <ApplicantCard />
          </Applicant.Provider>
        ))}
      </div>
    </div>
  );
};
