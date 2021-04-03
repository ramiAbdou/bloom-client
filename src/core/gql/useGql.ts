import { useMemo } from 'react';

import { ApolloClient, useApolloClient } from '@apollo/client';
import { useStoreActions } from '@store/Store';
import findOne from './repo/findOne';
import update from './repo/update';

const useGql = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const client: ApolloClient<any> = useApolloClient();

  const gql = useMemo(() => {
    return {
      memberSocials: {
        update: async (args) => {
          console.log('update member socials');
          console.log(args);
          return update({
            ...args,
            client,
            entity: 'memberSocials',
            mergeEntities
          });
        }
      },
      users: {
        findOne: async (args) => {
          console.log('find one users');
          return findOne({
            ...args,
            client,
            entity: 'users',
            mergeEntities
          });
        },

        update: async (args) => {
          console.log('update user');
          console.log(args);
        }
      }
    };
  }, []);

  return gql;
};

export default useGql;
