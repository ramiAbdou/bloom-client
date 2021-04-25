import { communityIdVar } from 'src/App.reactive';

import {
  ApolloClient,
  gql,
  useApolloClient,
  useReactiveVar
} from '@apollo/client';
import { ICommunity } from '@util/constants.entities';

const useCommunityName = (): string => {
  const apolloClient: ApolloClient<unknown> = useApolloClient();
  const communityId: string = useReactiveVar(communityIdVar);

  const community: ICommunity = apolloClient.cache.readFragment({
    fragment: gql`
      fragment CommunityNameFragment on communities {
        name
      }
    `,
    id: `communities:${communityId}`
  });

  return community?.name;
};

export default useCommunityName;
