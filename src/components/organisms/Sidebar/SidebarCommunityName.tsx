import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import {
  ApolloClient,
  gql,
  useApolloClient,
  useReactiveVar
} from '@apollo/client';
import Separator from '@components/atoms/Separator';
import { ICommunity } from '@core/db/db.entities';

const SidebarCommunityName: React.FC = () => {
  const client: ApolloClient<unknown> = useApolloClient();
  const commmunityId: string = useReactiveVar(communityIdVar);

  const community: ICommunity = client.cache.readFragment({
    fragment: gql`
      fragment SidebarCommunityNameFragment on communities {
        name
      }
    `,
    id: `communities:${commmunityId}`
  });

  if (!community) return null;

  return (
    <>
      <h3 className="c-primary mx-sm my-md">{community.name}</h3>
      <Separator noMargin />
    </>
  );
};

export default SidebarCommunityName;
