import { useMemo } from 'react';

import { ApolloClient, useApolloClient } from '@apollo/client';
import { useStoreActions } from '@store/Store';
import create from './repo/create';
import findOne from './repo/findOne';
import update from './repo/update';

const useGql = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const client: ApolloClient<any> = useApolloClient();

  const gql = useMemo(() => {
    return {
      eventGuests: {
        create: async (args) =>
          create({ ...args, client, entity: 'eventGuests', mergeEntities })
      },

      eventWatches: {
        create: async (args) =>
          create({ ...args, client, entity: 'eventWatches', mergeEntities })
      },

      events: {
        findOne: async (args) =>
          findOne({
            ...args,
            client,
            entity: 'events',
            mergeEntities
          }),

        update: async (args) =>
          update({
            ...args,
            client,
            entity: 'events',
            mergeEntities
          })
      },

      memberSocials: {
        update: async (args) =>
          update({
            ...args,
            client,
            entity: 'memberSocials',
            mergeEntities
          })
      },

      members: {
        update: async (args) =>
          update({
            ...args,
            client,
            entity: 'members',
            mergeEntities
          })
      },
      questions: {
        update: async (args) =>
          update({
            ...args,
            client,
            entity: 'questions',
            mergeEntities
          })
      },

      users: {
        findOne: async (args) =>
          findOne({
            ...args,
            client,
            entity: 'users',
            mergeEntities
          })
      }
    };
  }, []);

  return gql;
};

export default useGql;
