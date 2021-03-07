import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import {
  IEventAttendee,
  IMember,
  IMemberSocials,
  IMemberValue
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/events';

const useInitDatabase = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result1: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: [
      'bio',
      'email',
      'id',
      'isDuesActive',
      'firstName',
      'lastName',
      'joinedAt',
      'pictureUrl',
      'role',
      'status',
      { community: ['id'] },
      { plan: ['id'] },
      { socials: ['id'] }
    ],
    operation: QueryEvent.GET_DATABASE,
    schema: [Schema.MEMBER]
  });

  const result2: QueryResult<IMemberSocials[]> = useQuery<IMemberSocials[]>({
    fields: [
      'id',
      'clubhouseUrl',
      'facebookUrl',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl',
      { member: ['id'] }
    ],
    operation: QueryEvent.GET_ALL_MEMBER_SOCIALS,
    schema: [Schema.MEMBER_SOCIALS]
  });

  const result3 = useQuery<IEventAttendee[]>({
    fields: ['id', { member: ['id'] }],
    operation: QueryEvent.GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE]
  });

  const result4: QueryResult<IMemberValue[]> = useQuery<IMemberValue[]>({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: QueryEvent.GET_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  return {
    ...result1,
    loading:
      result1.loading || result2.loading || result3.loading || result4.loading
  };
};

export default useInitDatabase;
