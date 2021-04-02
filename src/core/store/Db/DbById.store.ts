import { computed } from 'easy-peasy';

import { DbModel } from './Db.types';

const dbByIdStore: Pick<
  DbModel,
  | 'byApplicationId'
  | 'byAttendeeId'
  | 'byCommunityId'
  | 'byCommunityIntegrationsId'
  | 'byEventId'
  | 'byGuestId'
  | 'byMemberId'
  | 'byMemberIntegrationsId'
  | 'byMemberValuesId'
  | 'byPaymentId'
  | 'byQuestionId'
  | 'bySocialsId'
  | 'byMemberTypeId'
  | 'byRankedQuestionId'
  | 'bySupporterId'
  | 'byUserId'
  | 'byWatchId'
> = {
  byApplicationId: computed(({ entities }) => entities.applications.byId),

  byAttendeeId: computed(({ entities }) => entities.attendees.byId),

  byCommunityId: computed(({ entities }) => entities.communities.byId),

  byCommunityIntegrationsId: computed(
    ({ entities }) => entities.communityIntegrations.byId
  ),

  byEventId: computed(({ entities }) => entities.events.byId),

  byGuestId: computed(({ entities }) => entities.guests.byId),

  byMemberId: computed(({ entities }) => entities.members.byId),

  byMemberIntegrationsId: computed(
    ({ entities }) => entities.memberIntegrations.byId
  ),

  byMemberTypeId: computed(({ entities }) => entities.memberTypes.byId),

  byMemberValuesId: computed(({ entities }) => entities.memberValues.byId),

  byPaymentId: computed(({ entities }) => entities.payments.byId),

  byQuestionId: computed(({ entities }) => entities.questions.byId),

  byRankedQuestionId: computed(({ entities }) => entities.rankedQuestions.byId),

  bySocialsId: computed(({ entities }) => entities.socials.byId),

  bySupporterId: computed(({ entities }) => entities.supporters.byId),

  byUserId: computed(({ entities }) => entities.users.byId),

  byWatchId: computed(({ entities }) => entities.watches.byId)
};

export default dbByIdStore;
