import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';

const Applicants: React.FC = () => {
  const { loading: loading1 } = useQuery<IMember[]>({
    fields: [
      'id',
      'createdAt',
      'role',
      'status',
      { community: ['id'] },
      { data: ['id', 'value', { question: ['id'] }] },
      { type: ['id'] },
      { user: ['id', 'email', 'firstName', 'gender', 'lastName'] }
    ],
    operation: 'getApplicants',
    schema: [Schema.MEMBER]
  });

  const { loading: loading2 } = useQuery<IMember[]>({
    fields: ['id', 'inApplicantCard', 'inApplication'],
    operation: 'getQuestions',
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
