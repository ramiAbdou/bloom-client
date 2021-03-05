import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberSocials } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitProfileSocial = (): QueryResult<IMemberSocials> => {
  const result: QueryResult<IMemberSocials> = useQuery<IMemberSocials>({
    fields: [
      'clubhouseUrl',
      'facebookUrl',
      'instagramUrl',
      'id',
      'linkedInUrl',
      'twitterUrl',
      { member: ['id'] }
    ],
    operation: 'getMemberSocials',
    schema: Schema.MEMBER_SOCIALS
  });

  return result;
};

export default useInitProfileSocial;
