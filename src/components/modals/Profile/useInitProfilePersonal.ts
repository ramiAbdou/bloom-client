import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberSocials } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { QueryEvent } from '@util/events';

const useInitProfilePersonal = (): QueryResult<IMemberSocials> => {
  const memberId = IdStore.useStoreState((state) => state.id);

  const result: QueryResult<IMemberSocials> = useQuery<IMemberSocials>({
    fields: [
      'clubhouseUrl',
      'facebookUrl',
      'id',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl',
      { member: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBER_SOCIALS,
    schema: [Schema.MEMBER_SOCIALS],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return result;
};

export default useInitProfilePersonal;
