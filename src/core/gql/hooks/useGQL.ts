import { ApolloClient, useApolloClient } from '@apollo/client';
import GQL from '../GQL';

const useGQL = (): GQL => {
  const client: ApolloClient<unknown> = useApolloClient();
  return new GQL(client);
};

export default useGQL;
