import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember, IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/events';

const useInitAnalytics = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { loading: loading1 }: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: [
      'id',
      'isDuesActive',
      'status',
      { community: ['id'] },
      { plan: ['id'] }
    ],
    operation: QueryEvent.GET_DATABASE,
    schema: [Schema.MEMBER]
  });

  const { loading: loading2 }: QueryResult<IMemberValue[]> = useQuery<
    IMemberValue[]
  >({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: QueryEvent.GET_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  return { loading: loading1 || loading2 };
};

export default useInitAnalytics;
