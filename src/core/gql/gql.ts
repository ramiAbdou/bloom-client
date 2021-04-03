import { ApolloClient } from '@apollo/client';
import findOne from './findOne';

type EntityName = 'users';

interface BaseArgs {
  client: ApolloClient<any>;
}

interface EntityFindOneArgs<T> extends BaseArgs {
  fields: string[];
  where: Partial<T>;
}

interface EntityUpdateArgs<T> {
  where: Partial<T>;
}

interface Entity<T = unknown> {
  create: VoidFunction;
  findOne: (args: EntityFindOneArgs<T>) => Promise<any>;
  update: (args: EntityUpdateArgs<T>) => Promise<any>;
}

const gql: Record<EntityName, Entity> = {
  users: {
    create: () => {
      console.log('create user');
    },

    findOne: async ({ client, fields, where }) => {
      console.log('find one users');
      // console.log(args);
      return findOne({ client, entity: 'users', fields, where });
    },

    update: async (args) => {
      console.log('update user');
      console.log(args);
    }
  }
};

export default gql;
