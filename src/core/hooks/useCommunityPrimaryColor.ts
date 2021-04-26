import { communityIdVar } from 'src/App.reactive';

import {
  ApolloClient,
  gql,
  useApolloClient,
  useReactiveVar
} from '@apollo/client';
import { ICommunity } from '@util/constants.entities';

const useCommunityPrimaryColor = (): string => {
  const apolloClient: ApolloClient<unknown> = useApolloClient();
  const communityId: string = useReactiveVar(communityIdVar);

  const community: ICommunity = apolloClient.cache.readFragment({
    fragment: gql`
      fragment CommunityPrimaryColorFragment on communities {
        primaryColor
      }
    `,
    id: `communities:${communityId}`
  });

  return community?.primaryColor;
};

export default useCommunityPrimaryColor;
