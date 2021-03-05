import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';

const Applicants: React.FC = () => {
  const { loading } = useQuery<IMember[]>({
    fields: [
      'email',
      'id',
      'createdAt',
      'firstName',
      'lastName',
      'role',
      'status',
      { community: ['id'] },
      { plan: ['id'] },
      { user: ['id'] },
      { values: ['id', 'value', { question: ['id'] }] }
    ],
    operation: 'getApplicants',
    schema: [Schema.MEMBER]
  });

  return (
    <MainContent>
      <ApplicantsHeader loading={loading} />
      {!loading && <ApplicantsCardList />}
    </MainContent>
  );
};

export default Applicants;
