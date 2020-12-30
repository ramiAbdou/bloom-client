import React, { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import {
  GET_PENDING_APPLICATIONS,
  GetPendingApplicantsResult
} from './Applicants.gql';
import Applicants from './Applicants.store';
import ApplicantsHeader from './components/Header/Header';
import ApplicantsCardContainer from './containers/Card';

const useFetchApplicants = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Applicants.useStoreState((store) => store.loading);
  const setLoading = Applicants.useStoreActions((store) => store.setLoading);

  const { data: community, loading } = useQuery<GetPendingApplicantsResult>({
    name: 'getApplicants',
    query: GET_PENDING_APPLICATIONS
  });

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (!community) return;

    mergeEntities({
      data: { ...community, questions: community.application.questions },
      schema: Schema.COMMUNITY
    });
  }, [community]);
};

const ApplicantsContent = () => {
  useFetchApplicants();

  return (
    <>
      <ApplicantsHeader />
      <ApplicantsCardContainer />
    </>
  );
};

export default () => (
  <Applicants.Provider>
    <ApplicantsContent />
  </Applicants.Provider>
);
