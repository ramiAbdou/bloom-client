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
  | 'byPaymentId'
  | 'byQuestionId'
  | 'bySocialsId'
  | 'byMemberPlanId'
  | 'byRankedQuestionId'
  | 'bySupporterId'
  | 'byUserId'
  | 'byValuesId'
  | 'byWatchId'
> = {
  byApplicationId: computed(({ entities }) => {
    return entities.applications.byId;
  }),

  byAttendeeId: computed(({ entities }) => {
    return entities.attendees.byId;
  }),

  byCommunityId: computed(({ entities }) => {
    return entities.communities.byId;
  }),

  byCommunityIntegrationsId: computed(({ entities }) => {
    return entities.communityIntegrations.byId;
  }),

  byEventId: computed(({ entities }) => {
    return entities.events.byId;
  }),

  byGuestId: computed(({ entities }) => {
    return entities.guests.byId;
  }),

  byMemberId: computed(({ entities }) => {
    return entities.members.byId;
  }),

  byMemberIntegrationsId: computed(({ entities }) => {
    return entities.memberIntegrations.byId;
  }),

  byMemberPlanId: computed(({ entities }) => {
    return entities.memberPlans.byId;
  }),

  byPaymentId: computed(({ entities }) => {
    return entities.payments.byId;
  }),

  byQuestionId: computed(({ entities }) => {
    return entities.questions.byId;
  }),

  byRankedQuestionId: computed(({ entities }) => {
    return entities.rankedQuestions.byId;
  }),

  bySocialsId: computed(({ entities }) => {
    return entities.socials.byId;
  }),

  bySupporterId: computed(({ entities }) => {
    return entities.supporters.byId;
  }),

  byUserId: computed(({ entities }) => {
    return entities.users.byId;
  }),

  byValuesId: computed(({ entities }) => {
    return entities.values.byId;
  }),

  byWatchId: computed(({ entities }) => {
    return entities.watches.byId;
  })
};

export default dbByIdStore;
