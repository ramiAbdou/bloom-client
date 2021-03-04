import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitDatabase = () => {
  const result: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: [
      'id',
      'isDuesActive',
      'joinedAt',
      'role',
      'status',
      { community: ['id'] },
      { type: ['id'] },
      { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] },
      { values: ['id', 'value', { question: ['id'] }] }
    ],
    operation: 'getDatabase',
    schema: [Schema.MEMBER]
  });

  return result;
};

export default useInitDatabase;
