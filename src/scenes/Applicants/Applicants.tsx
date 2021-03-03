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
      'id',
      'createdAt',
      'role',
      'status',
      { community: ['id'] },
      { data: ['id', 'value', { question: ['id'] }] },
      { type: ['id'] },
      { user: ['id', 'email', 'firstName', 'lastName'] }
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
