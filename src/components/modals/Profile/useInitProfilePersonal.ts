import useQuery from '@hooks/useQuery';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { QueryEvent } from '@util/events';

const useInitProfilePersonal = (): boolean => {
  const memberId = IdStore.useStoreState((state) => state.id);

  const { loading } = useQuery<IUser>({
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

  return loading;
};

export default useInitProfilePersonal;
