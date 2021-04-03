import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMemberSocials } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
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
    queryName: 'GetMemberSocialsByMemberId',
    schema: [Schema.MEMBER_SOCIALS],
    where: { memberId }
  });

  return result;
};

export default useInitProfilePersonal;
