import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_PENDING_APPLICATIONS } from './Applicants.gql';
import Applicants from './Applicants.store';
import ApplicantsCardContainer from './components/Card/Card.container';
import ApplicantsHeader from './components/Header/Header';

const useFetchApplicants = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Applicants.useStoreState((store) => store.loading);
  const setLoading = Applicants.useStoreActions((store) => store.setLoading);

  const { data, loading } = useQuery(GET_PENDING_APPLICATIONS);

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const { id, application, members } = data?.getApplicants ?? {};
    if (!id) return;

    mergeEntities({
      data: { id, members, questions: application.questions },
      schema: Schema.COMMUNITY
    });
  }, [data]);
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
