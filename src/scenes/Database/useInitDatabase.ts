import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember, IMemberSocials } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitDatabase = () => {
  const result1: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: [
      'email',
      'id',
      'isDuesActive',
      'firstName',
      'lastName',
      'joinedAt',
      'pictureUrl',
      'role',
      'status',
      { community: ['id'] },
      { plan: ['id'] },
      {
        socials: ['id']
      },
      { values: ['id', 'value', { question: ['id'] }] }
    ],
    operation: 'getDatabase',
    schema: [Schema.MEMBER]
  });

  const result2: QueryResult<IMemberSocials[]> = useQuery<IMemberSocials[]>({
    fields: [
      'id',
      'clubhouseUrl',
      'facebookUrl',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl',
      { member: ['id'] }
    ],
    operation: 'getAllMemberSocials',
    schema: [Schema.MEMBER_SOCIALS]
  });

  return { ...result1, loading: result1.loading || result2.loading };
};

export default useInitDatabase;
