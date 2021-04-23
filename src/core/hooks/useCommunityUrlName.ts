import { communityIdVar } from 'src/App.reactive';

import {
  ApolloClient,
  gql,
  useApolloClient,
  useReactiveVar
} from '@apollo/client';
import { ICommunity } from '@util/constants.entities';

const useCommunityUrlName = (): string => {
  const apolloClient: ApolloClient<unknown> = useApolloClient();
  const communityId: string = useReactiveVar(communityIdVar);

  const community: ICommunity = apolloClient.cache.readFragment({
    fragment: gql`
      fragment CommunityUrlNameFragment on communities {
        urlName
      }
    `,
    id: `communities:${communityId}`
  });

  return community?.urlName;
};

export default useCommunityUrlName;
