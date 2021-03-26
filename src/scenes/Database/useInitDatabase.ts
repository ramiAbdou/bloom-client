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
import { QueryEvent } from '@util/constants.events';

const useInitDatabase = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { loading: loading1 }: QueryResult<IMember[]> = useQuery<IMember[]>({
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
    operation: QueryEvent.GET_MEMBERS,
    schema: [Schema.MEMBER],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  const { loading: loading2 }: QueryResult<IMemberSocials[]> = useQuery<
    IMemberSocials[]
  >({
    fields: [
      'id',
      'facebookUrl',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl',
      { member: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBER_SOCIALS,
    schema: [Schema.MEMBER_SOCIALS],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  const { loading: loading3 }: QueryResult<IEventAttendee[]> = useQuery<
    IEventAttendee[]
  >({
    fields: ['id', { member: ['id'] }],
    operation: QueryEvent.GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE]
  });

  const { loading: loading4 }: QueryResult<IMemberValue[]> = useQuery<
    IMemberValue[]
  >({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: QueryEvent.GET_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  const { loading: loading5 }: QueryResult<IMemberValue[]> = useQuery<
    IMemberValue[]
  >({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: QueryEvent.GET_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  return {
    loading: loading1 || loading2 || loading3 || loading4 || loading5
  };
};

export default useInitDatabase;
