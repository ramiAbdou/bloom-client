import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitDirectory = (): boolean => {
  const { loading } = useQuery<IMember[]>({
    fields: [
      'id',
      'role',
      'status',
      { community: ['id'] },
      { data: ['id', 'value', { question: ['id'] }] },
      { type: ['id'] },
      { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: 'getDirectory',
    schema: [Schema.MEMBER]
  });

  return loading;
};

export default useInitDirectory;
