import useHasuraQuery from '@hooks/useHasuraQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitDatabase = (): QueryResult<IMember[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useHasuraQuery<IMember[]>({
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
    queryName: 'GetMembersByCommunityId',
    schema: [Schema.MEMBER],
    variables: { communityId: { type: 'String!', value: communityId } },
    where: { community_id: { _eq: '$communityId' } }
  });

  return result;
};

export default useInitDatabase;
