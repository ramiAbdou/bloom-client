import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import LoadingStore from '@store/Loading.store';
import { Schema } from '@store/schema';
import {
  GET_PENDING_APPLICATIONS,
  GetPendingApplicantsResult
} from './Applicants.gql';
import ApplicantsCardContainer from './ApplicantsCardContainer';
import ApplicantsHeader from './ApplicantsHeader';

const ApplicantsContent: React.FC = () => {
  const { loading } = useQuery<GetPendingApplicantsResult>({
    format: (data) => ({ ...data, questions: data.application.questions }),
    name: 'getApplicants',
    query: GET_PENDING_APPLICATIONS,
    schema: Schema.COMMUNITY
  });

  return (
    <MainContent Header={ApplicantsHeader} loading={loading}>
      <ApplicantsCardContainer />
    </MainContent>
  );
};

const Applicants: React.FC = () => (
  <LoadingStore.Provider>
    <ApplicantsContent />
  </LoadingStore.Provider>
);

export default Applicants;
