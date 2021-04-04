import React from 'react';

import MainContent from '@containers/Main/MainContent';
import { QueryResult } from '@gql/gql.types';
import { IMember } from '@db/db.entities';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';
import useInitApplicants from './useInitApplicants';

const Applicants: React.FC = () => {
  const { loading }: QueryResult<IMember[]> = useInitApplicants();

  return (
    <MainContent>
      <ApplicantsHeader loading={loading} />
      {!loading && <ApplicantsCardList />}
    </MainContent>
  );
};

export default Applicants;
