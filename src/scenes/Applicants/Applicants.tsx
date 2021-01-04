import React, { useEffect } from 'react';

import MainContent from '@templates/Main/Content';
import useQuery from '@hooks/useQuery';
import Loading from '@store/Loading.store';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import {
  GET_PENDING_APPLICATIONS,
  GetPendingApplicantsResult
} from './Applicants.gql';
import ApplicantsHeader from './components/Header/Header';
import ApplicantsCardContainer from './containers/Card';

const useFetchApplicants = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Loading.useStoreState((store) => store.loading);
  const setLoading = Loading.useStoreActions((store) => store.setLoading);

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

      <MainContent>
        <ApplicantsCardContainer />
      </MainContent>
    </>
  );
};

export default () => (
  <Loading.Provider>
    <ApplicantsContent />
  </Loading.Provider>
);
