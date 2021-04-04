import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMemberSocials } from '@store/db/Db.entities';
import { Schema } from '@store/db/Db.schema';
import { useStoreState } from '@store/Store';

const useInitProfileSocial = (): QueryResult<IMemberSocials[]> => {
  const memberId: string = useStoreState(({ db }) => db.member.id);

  const result = useQuery<IMemberSocials[]>({
    fields: [
      'facebookUrl',
      'instagramUrl',
      'id',
      'linkedInUrl',
      'member.id',
      'twitterUrl'
    ],
    operation: 'memberSocials',
    schema: [Schema.MEMBER_SOCIALS],
    where: { memberId }
  });

  return result;
};

export default useInitProfileSocial;
