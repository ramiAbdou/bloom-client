import useQuery from '@gql/useQuery';
import { QueryResult } from '@gql/useQuery.types';
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
    variables: { memberId: { type: 'String!', value: memberId } },
    where: { member_id: { _eq: '$memberId' } }
  });

  return result;
};

export default useInitProfilePersonal;
