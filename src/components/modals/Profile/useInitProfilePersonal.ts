import useQuery from '@hooks/useQuery';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';

const useInitProfilePersonal = (): boolean => {
  const memberId = IdStore.useStoreState((store) => store.id);

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
    operation: 'getMemberSocials',
    schema: Schema.MEMBER_SOCIALS,
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return loading;
};

export default useInitProfilePersonal;
