import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { userIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';
import { IMember } from '@util/constants.entities';

interface GetMembersByUserIdArgs {
  userId: string;
}

const GET_MEMBERS_BY_USER_ID: DocumentNode = gql`
  query GetMembersByUserId($userId: String!) {
    members(where: { userId: { _eq: $userId } }) {
      id
      community {
        id
        name
        logoUrl
        urlName
      }
    }
  }
`;

const CatchAllRoute: React.FC<Pick<RouteProps, 'exact' | 'path'>> = ({
  exact,
  path
}) => {
  const userId: string = useReactiveVar(userIdVar);

  const { data: members } = useQuery<IMember[], GetMembersByUserIdArgs>(
    GET_MEMBERS_BY_USER_ID,
    { skip: !userId, variables: { userId } }
  );

  // If userId isn't present, means the user isn't logged in, so redirect
  // the user to the login page.
  if (!userId) return <Redirect to="/login" />;

  // If the members of the user have loaded, redirect them to the first
  // community that loads.
  if (members?.length) {
    const { urlName } = members[0].community;
    return <Redirect to={`/${urlName}/directory`} />;
  }

  // Otherwise, return a Route that is null until our queries finish.
  return <Route component={null} exact={exact} path={path} />;
};

export default CatchAllRoute;
