import { computed } from 'easy-peasy';

import { DbModel } from './db.types';

const dbByIdStore: Pick<
  DbModel,
  | 'byApplicationId'
  | 'byCommunityId'
  | 'byCommunityIntegrationsId'
  | 'byEventId'
  | 'byEventAttendeeId'
  | 'byEventGuestId'
  | 'byEventWatchId'
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
> = {
  byApplicationId: computed(({ entities }) => entities.applications.byId),

  byCommunityId: computed(({ entities }) => entities.communities.byId),

  byCommunityIntegrationsId: computed(
    ({ entities }) => entities.communityIntegrations.byId
  ),

  byEventAttendeeId: computed(({ entities }) => entities.eventAttendees.byId),

  byEventGuestId: computed(({ entities }) => entities.eventGuests.byId),

  byEventId: computed(({ entities }) => entities.events.byId),

  byEventWatchId: computed(({ entities }) => entities.eventWatches.byId),

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

  byUserId: computed(({ entities }) => entities.users.byId)
};

export default dbByIdStore;
