import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IMember } from '@util/constants.entities';

interface GetMembersByUserIdResult {
  members: IMember[];
}

const GET_MEMBERS_BY_USER_ID: DocumentNode = gql`
  query GetMembersByUserId($userId: String!) {
    userId @client @export(as: "userId")

    members(where: { status: { _eq: "Accepted" }, userId: { _eq: $userId } }) {
      id
      community {
        urlName
      }
    }
  }
`;

const CatchAllRoute: React.FC<Pick<RouteProps, 'exact' | 'path'>> = ({
  exact,
  path
}) => {
  const { data, loading } = useQuery<GetMembersByUserIdResult>(
    GET_MEMBERS_BY_USER_ID
  );

  if (loading) return <Route component={null} exact={exact} path={path} />;

  const members: IMember[] = data?.members;

  // If userId isn't present, means the user isn't logged in, so redirect
  // the user to the login page.
  if (!members?.length) return <Redirect to="/login" />;

  // If the members of the user have loaded, redirect them to the first
  // community that loads.

  const { urlName } = members[0].community;
  return <Redirect to={`/${urlName}/directory`} />;
};

export default CatchAllRoute;
