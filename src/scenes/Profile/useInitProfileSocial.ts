import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberSocials } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitProfileSocial = (): QueryResult<IMemberSocials[]> => {
  const memberId: string = useStoreState(({ db }) => db.member.id);

  const result: QueryResult<IMemberSocials[]> = useQuery<IMemberSocials[]>({
    fields: [
      'clubhouseUrl',
      'facebookUrl',
      'instagramUrl',
      'id',
      'linkedInUrl',
      'twitterUrl'
    ],
    operation: QueryEvent.GET_MEMBER_SOCIALS,
    schema: [Schema.MEMBER_SOCIALS],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return result;
};

export default useInitProfileSocial;
