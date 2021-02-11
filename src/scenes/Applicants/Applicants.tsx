import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_APPLICANTS, GET_APPLICANTS_QUESTIONS } from './Applicants.gql';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';

const Applicants: React.FC = () => {
  const { loading: loading1 } = useQuery<IMember[]>({
    operation: 'getApplicants',
    query: GET_APPLICANTS,
    schema: [Schema.MEMBER]
  });

  const { loading: loading2 } = useQuery<IMember[]>({
    operation: 'getQuestions',
    query: GET_APPLICANTS_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const loading = loading1 && loading2;

  return (
    <MainContent>
      <ApplicantsHeader loading={loading} />
      {!loading && <ApplicantsCardList />}
    </MainContent>
  );
};

export default Applicants;
