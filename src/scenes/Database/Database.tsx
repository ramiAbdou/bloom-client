import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import Show from '@components/containers/Show';
import useFind from '@gql/hooks/useFind';
import { IMember, MemberStatus } from '@util/constants.entities';
import AdminDatabase from './AdminDatabase/AdminDatabase';
import DatabaseHeader from './DatabaseHeader';
import MemberDatabase from './MemberDatabase/MemberDatabase';

const Database: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { loading } = useFind(IMember, {
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
            <Route component={AdminDatabase} path="/:urlName/database/admins" />

            <Route
              component={MemberDatabase}
              path="/:urlName/database/members"
            />

            <Redirect to="/:urlName/database/members" />
          </Switch>
        </Show>
      </MainContent>
    </Scene>
  );
};

export default Database;
