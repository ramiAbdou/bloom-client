import { memberIdVar } from 'src/App.reactive';

import {
  ApolloClient,
  gql,
  useApolloClient,
  useReactiveVar
} from '@apollo/client';
import { IMember, MemberRole } from '@util/constants.entities';

const useMemberRole = (): MemberRole => {
  const apolloClient: ApolloClient<unknown> = useApolloClient();
  const memberId: string = useReactiveVar(memberIdVar);

  const member: IMember = apolloClient.cache.readFragment({
    fragment: gql`
      fragment MemberRoleFragment on members {
        role
      }
    `,
    id: `members:${memberId}`
  });

  return member?.role;
};

export default useMemberRole;
