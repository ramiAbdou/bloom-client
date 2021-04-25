import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import {
  communityIdVar,
  memberIdVar,
  memberSocialsIdVar,
  userIdVar
} from 'src/App.reactive';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';
import { UrlNameProps } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { updateDocumentColors } from '@util/util';

interface GetMemberByCommunityUrlNameArgs {
  urlName: string;
}

interface GetMemberByCommunityUrlNameResult {
  members: IMember[];
}

const GET_MEMBER_BY_COMMUNITY_URL_NAME: DocumentNode = gql`
  query GetMemberByCommunityUrlName($urlName: String!, $userId: String!) {
    userId @client @export(as: "userId")

    members(
      where: {
        community: { urlName: { _eq: $urlName } }
        status: { _eq: "Accepted" }
        userId: { _eq: $userId }
      }
      limit: 1
    ) {
      id
      role
      community {
        id
        primaryColor
      }

      memberSocials {
        id
      }
    }
  }
`;

interface MemberRouteProps extends RouteProps {
  admin?: boolean;
  redirect?: boolean;
}

const MemberRoute: React.FC<MemberRouteProps> = ({
  admin,
  component,
  redirect = true,
  ...rest
}) => {
  const communityId: string = useReactiveVar(communityIdVar);
  const userId: string = useReactiveVar(userIdVar);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore b/c we know that computed match exists and we need to use
  // this because the useParams() hook isn't loaded by this point so the urlName
  // still would not be known to us.
  const { urlName }: UrlNameProps = rest?.computedMatch?.params;

  const { data, loading } = useQuery<
    GetMemberByCommunityUrlNameResult,
    GetMemberByCommunityUrlNameArgs
  >(GET_MEMBER_BY_COMMUNITY_URL_NAME, {
    skip: !urlName || !userId,
    variables: { urlName }
  });

  const member: IMember = data?.members?.length ? data?.members[0] : null;

  useEffect(() => {
    // In order to set the active entities, we need to make sure the query
    // actually returned those ID's.
    if (!member?.id || !member.community?.id) return;

    communityIdVar(member.community.id);
    memberIdVar(member.id);
    memberSocialsIdVar(member.memberSocials.id);

    // As we set the active entities, we must also update the document
    // colors with the community's primary color.
    updateDocumentColors(member.community.primaryColor);
  }, [member]);

  // Just wait if the query is still loading.
  if (loading) return null;

  // If it is no longer loading and there is no member at all, that means the
  // user isn't authorized to view this community so let's redirect them to
  // the catch all route, maybe they are apart of another community.
  if (!member && redirect) return <Redirect to="/" />;

  // If it is an admin route and the member is not an admin/owner, redirect
  // them to the community's directory page.
  if (admin && !member.role) return <Redirect to={`/${urlName}/directory`} />;

  // Need to wait for the communityIdVar to update properly, since many of
  // the queries beyond this point depend on it.
  if (!communityId) return null;

  return <Route component={component} {...rest} />;
};

export default MemberRoute;
