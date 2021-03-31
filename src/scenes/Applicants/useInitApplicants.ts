import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/constants.events';

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
      { memberType: ['id'] },
      { values: ['id', 'value', { question: ['id'] }] }
    ],
    operation: QueryEvent.LIST_APPLICANTS,
    schema: [Schema.MEMBER]
  });

  return result;
};

export default useInitApplicants;
