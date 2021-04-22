import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import useFind from '@gql/hooks/useFind';
import { IMember } from '@util/constants.entities';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';

const Applicants: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { loading } = useFind(IMember, {
    fields: [
      'community.id',
      'createdAt',
      'email',
      'id',
      'firstName',
      'lastName',
      'memberType.id',
      'memberValues.id',
      'memberValues.question.id',
      'memberValues.value',
      'role',
      'status'
    ],
    where: { communityId, status: 'Pending' }
  });

  return (
    <Scene>
      <MainContent>
        <ApplicantsHeader loading={loading} />
        {!loading && <ApplicantsCardList />}
      </MainContent>
    </Scene>
  );
};

export default Applicants;
