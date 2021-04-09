import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import Scene from '@containers/Scene';
import Show from '@containers/Show';
import { IMember, MemberStatus } from '@db/db.entities';
import useFindFull from '@gql/hooks/useFindFull';
import { useStoreState } from '@store/Store';
import AdminDatabase from './AdminDatabase/AdminDatabase';
import DatabaseHeader from './DatabaseHeader';
import MemberDatabase from './MemberDatabase/MemberDatabase';

const Database: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const { url } = useRouteMatch();

  const { loading } = useFindFull(IMember, {
    fields: [
      'bio',
      'community.id',
      'deletedAt',
      'email',
      'eventAttendees.id',
      'eventAttendees.member.id',
      'id',
      'firstName',
      'lastName',
      'joinedAt',
      'memberSocials.facebookUrl',
      'memberSocials.instagramUrl',
      'memberSocials.linkedInUrl',
      'memberSocials.member.id',
      'memberSocials.twitterUrl',
      'memberType.id',
      'memberValues.id',
      'memberValues.member.id',
      'memberValues.question.id',
      'memberValues.value',
      'pictureUrl',
      'role',
      'status'
    ],
    where: { communityId, status: MemberStatus.ACCEPTED }
  });

  return (
    <Scene>
      <MainContent>
        <DatabaseHeader loading={loading} />

        <Show show={!loading}>
          <Switch>
            <Route component={AdminDatabase} path={`${url}/admins`} />
            <Route component={MemberDatabase} path={`${url}/members`} />
            <Redirect to={`${url}/members`} />
          </Switch>
        </Show>
      </MainContent>
    </Scene>
  );
};

export default Database;
