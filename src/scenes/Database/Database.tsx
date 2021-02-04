import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import {
  GET_DATABASE,
  GET_DATABASE_QUESTIONS
} from '@scenes/Database/Database.gql';
import { ICommunity, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_TYPES } from '@store/Store.gql';
import AdminDatabase from './AdminDatabase/AdminDatabase';
import DatabaseHeader from './DatabaseHeader';
import MemberDatabase from './MemberDatabase/MemberDatabase';

const Database: React.FC = () => {
  const { url } = useRouteMatch();

  const { data: data1 } = useQuery<ICommunity>({
    name: 'getDatabase',
    query: GET_DATABASE,
    schema: [Schema.MEMBER]
  });

  const { data: data2 } = useQuery<IQuestion[]>({
    name: 'getQuestions',
    query: GET_DATABASE_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const { data: data3 } = useQuery<IQuestion[]>({
    name: 'getTypes',
    query: GET_TYPES,
    schema: [Schema.MEMBER_TYPE]
  });

  const loading = !data1 && !data2 && !data3;

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
