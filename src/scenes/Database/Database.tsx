import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import AdminDatabase from './AdminDatabase/AdminDatabase';
import DatabaseHeader from './DatabaseHeader';
import MemberDatabase from './MemberDatabase/MemberDatabase';

const Database: React.FC = () => {
  const { url } = useRouteMatch();

  const { loading } = useQuery<IMember[]>({
    fields: [
      'id',
      'isDuesActive',
      'joinedAt',
      'role',
      'status',
      { community: ['id'] },
      { data: ['id', 'value', { question: ['id'] }] },
      { type: ['id'] },
      { user: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: 'getDatabase',
    schema: [Schema.MEMBER]
  });

  return (
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
  );
};

export default Database;
