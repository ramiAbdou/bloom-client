import React from 'react';

import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';

const Applicants: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

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
