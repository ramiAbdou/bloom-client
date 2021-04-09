import React from 'react';

import MainContent from '@containers/Main/MainContent';
import Scene from '@containers/Scene';
import { IMember } from '@db/db.entities';
import useFindFull from '@gql/hooks/useFindFull';
import { useStoreState } from '@store/Store';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';

const Applicants: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { loading } = useFindFull(IMember, {
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
