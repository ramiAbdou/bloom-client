import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitDirectory = (): QueryResult<IMember[]> => {
  const result: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: [
      'bio',
      'email',
      'firstName',
      'id',
      'joinedAt',
      'lastName',
      'pictureUrl',
      'role',
      'status',
      { community: ['id'] },
      { plan: ['id'] },
      { values: ['id', 'value', { question: ['id'] }] }
    ],
    operation: 'getDirectory',
    schema: [Schema.MEMBER]
  });

  return result;
};

export default useInitDirectory;
