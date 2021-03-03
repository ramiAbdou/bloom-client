import useQuery from '@hooks/useQuery';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import ProfileStore from './Profile.store';

const useInitProfilePersonal = (): boolean => {
  const userId = ProfileStore.useStoreState((store) => store.userId);

  const { loading } = useQuery<IUser>({
    fields: [
      'clubhouseUrl',
      'email',
      'facebookUrl',
      'id',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl'
    ],
    operation: 'getUser',
    schema: Schema.USER,
    types: { userId: { required: false } },
    variables: { userId }
  });

  return loading;
};

export default useInitProfilePersonal;
