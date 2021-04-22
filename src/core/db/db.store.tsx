import { DbModel } from './db.types';

const dbActiveIds: Pick<DbModel, 'communityId'> = {
  communityId: null
};

const dbStore: DbModel = {
  ...dbActiveIds
};

export default dbStore;
