import { computed } from 'easy-peasy';

import { DbModel } from './Db.types';

const dbByIdStore: Pick<
  DbModel,
  | 'byApplicationId'
  | 'byCommunityId'
  | 'byCommunityIntegrationsId'
  | 'byEventId'
  | 'byEventAttendeeId'
  | 'byGuestId'
  | 'byMemberId'
  | 'byMemberIntegrationsId'
  | 'byMemberSocialsId'
  | 'byMemberValuesId'
  | 'byPaymentId'
  | 'byQuestionId'
  | 'byMemberTypeId'
  | 'byRankedQuestionId'
  | 'bySupporterId'
  | 'byUserId'
  | 'byWatchId'
> = {
  byApplicationId: computed(({ entities }) => entities.applications.byId),

  byCommunityId: computed(({ entities }) => entities.communities.byId),

  byCommunityIntegrationsId: computed(
    ({ entities }) => entities.communityIntegrations.byId
  ),

  byEventAttendeeId: computed(({ entities }) => entities.eventAttendees.byId),

  byEventId: computed(({ entities }) => entities.events.byId),

  byGuestId: computed(({ entities }) => entities.guests.byId),

  byMemberId: computed(({ entities }) => entities.members.byId),

  byMemberIntegrationsId: computed(
    ({ entities }) => entities.memberIntegrations.byId
  ),

  byMemberSocialsId: computed(({ entities }) => entities.memberSocials.byId),

  byMemberTypeId: computed(({ entities }) => entities.memberTypes.byId),

  byMemberValuesId: computed(({ entities }) => entities.memberValues.byId),

  byPaymentId: computed(({ entities }) => entities.payments.byId),

  byQuestionId: computed(({ entities }) => entities.questions.byId),

  byRankedQuestionId: computed(({ entities }) => entities.rankedQuestions.byId),

  bySupporterId: computed(({ entities }) => entities.supporters.byId),

  byUserId: computed(({ entities }) => entities.users.byId),

  byWatchId: computed(({ entities }) => entities.watches.byId)
};

export default dbByIdStore;
