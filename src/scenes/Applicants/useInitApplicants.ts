import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/events';

const useInitApplicants = (): QueryResult<IMember[]> => {
  const result: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: [
      'createdAt',
      'email',
      'id',
      'firstName',
      'lastName',
      'role',
      'status',
      { community: ['id'] },
      { plan: ['id'] },
      { values: ['id', 'value', { question: ['id'] }] }
    ],
    operation: QueryEvent.GET_APPLICANTS,
    schema: [Schema.MEMBER]
  });

  console.log(result);

  return result;
};

export default useInitApplicants;
