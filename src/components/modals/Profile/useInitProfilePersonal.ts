import { IMemberSocials } from '@db/db.entities';
import { Schema } from '@db/db.schema';
import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import IdStore from '@store/Id.store';

const useInitProfilePersonal = (): QueryResult<IMemberSocials[]> => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

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

export default useInitProfilePersonal;
