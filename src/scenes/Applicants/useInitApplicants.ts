import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMember } from '@store/Db/Db.entities';
import { Schema } from '@store/Db/Db.schema';
import { useStoreState } from '@store/Store';

const useInitApplicants = (): QueryResult<IMember[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IMember[]>({
    fields: [
      'community.id',
      'createdAt',
      'email',
      'id',
      'firstName',
      'lastName',
      'memberType.id',
      'memberValues.id',
      'memberValues.question.id',
      'memberValues.value',
      'role',
      'status'
    ],
    operation: 'members',
    schema: [Schema.MEMBER],
    where: { communityId, status: 'Pending' }
  });

  return result;
};

export default useInitApplicants;
