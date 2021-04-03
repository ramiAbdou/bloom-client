import useQuery from '@gql/useQuery';
import { QueryResult } from '@gql/useQuery.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitApplicants = (): QueryResult<IMember[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery({
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
    queryName: 'GetApplicantsByCommunityId',
    schema: [Schema.MEMBER],
    variables: {
      communityId: { type: 'String!', value: communityId },
      status: { type: 'String!', value: 'Pending' }
    },
    where: {
      community: { id: { _eq: '$communityId' } },
      status: { _eq: '$status' }
    }
  });

  return result;
};

export default useInitApplicants;
