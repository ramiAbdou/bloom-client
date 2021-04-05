import { computed } from 'easy-peasy';

import { DbModel } from './db.types';

const dbByIdStore: Pick<
  DbModel,
  | 'byCommunityId'
  | 'byCommunityIntegrationsId'
  | 'byEventId'
  | 'byEventAttendeeId'
  | 'byEventGuestId'
  | 'byMemberId'
  | 'byMemberIntegrationsId'
  | 'byMemberValuesId'
  | 'byPaymentId'
  | 'byQuestionId'
  | 'byMemberTypeId'
  | 'byRankedQuestionId'
  | 'byUserId'
> = {
  byCommunityId: computed(({ entities }) => entities.communities.byId),

  byCommunityIntegrationsId: computed(
    ({ entities }) => entities.communityIntegrations.byId
  ),

  byEventAttendeeId: computed(({ entities }) => entities.eventAttendees.byId),

  byEventGuestId: computed(({ entities }) => entities.eventGuests.byId),

  byEventId: computed(({ entities }) => entities.events.byId),

  byMemberId: computed(({ entities }) => entities.members.byId),

  byMemberIntegrationsId: computed(
    ({ entities }) => entities.memberIntegrations.byId
  ),

  byMemberTypeId: computed(({ entities }) => entities.memberTypes.byId),

  byMemberValuesId: computed(({ entities }) => entities.memberValues.byId),

  byPaymentId: computed(({ entities }) => entities.payments.byId),

  byQuestionId: computed(({ entities }) => entities.questions.byId),

  byRankedQuestionId: computed(({ entities }) => entities.rankedQuestions.byId),

  byUserId: computed(({ entities }) => entities.users.byId)
};

export default dbByIdStore;
