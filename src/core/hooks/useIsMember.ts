import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IMember } from '@util/constants.entities';

interface GetMemberByCommunityIdAndUserIdResult {
  members: IMember[];
}

const GET_MEMBER_BY_COMMUNITY_ID_AND_USER_ID: DocumentNode = gql`
  query GetMemberByCommunityIdAndUserId($communityId: String, $userId: String) {
    communityId @client @export(as: "communityId")
    userId @client @export(as: "userId")

    members(
      where: { communityId: { _eq: $communityId }, userId: { _eq: $userId } }
    ) {
      id
    }
  }
`;

/**
 * Returns true if the authenticated user has a membership with the active
 * community.
 *
 * Useful when going to pages outside of authenticated realm, such as viewing
 * IndividualEvent.
 */
const useIsMember = (): boolean => {
  const { data, loading } = useQuery<GetMemberByCommunityIdAndUserIdResult>(
    GET_MEMBER_BY_COMMUNITY_ID_AND_USER_ID
  );

  const isMember: boolean = !!data?.members?.length;

  return loading || isMember;
};

export default useIsMember;
