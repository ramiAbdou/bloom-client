import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMember } from '@store/Db/Db.entities';
import { Schema } from '@store/Db/Db.schema';
import { useStoreState } from '@store/Store';

const useInitDatabase = (): QueryResult<IMember[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IMember[]>({
    fields: [
      'bio',
      'community.id',
      'email',
      'eventAttendees.id',
      'eventAttendees.member.id',
      'id',
      'firstName',
      'lastName',
      'joinedAt',
      'memberSocials.facebookUrl',
      'memberSocials.instagramUrl',
      'memberSocials.linkedInUrl',
      'memberSocials.member.id',
      'memberSocials.twitterUrl',
      'memberType.id',
      'memberValues.id',
      'memberValues.member.id',
      'memberValues.question.id',
      'memberValues.value',
      'pictureUrl',
      'role',
      'status'
    ],
    operation: 'members',
    schema: [Schema.MEMBER],
    where: { communityId }
  });

  return result;
};

export default useInitDatabase;
