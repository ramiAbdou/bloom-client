import { computed } from 'easy-peasy';

import { DbModel } from './Db.types';

const dbByIdStore: Pick<
  DbModel,
  | 'byApplicationId'
  | 'byAttendeeId'
  | 'byCommunityId'
  | 'byEventId'
  | 'byGuestId'
  | 'byIntegrationsId'
  | 'byMemberId'
  | 'byPaymentId'
  | 'byQuestionId'
  | 'bySocialsId'
  | 'byTypeId'
  | 'byUserId'
  | 'byValuesId'
  | 'byWatchId'
> = {
  byApplicationId: computed(({ entities }) => entities.applications?.byId),
  byAttendeeId: computed(({ entities }) => entities.attendees?.byId),
  byCommunityId: computed(({ entities }) => entities.communities?.byId),
  byEventId: computed(({ entities }) => entities.events?.byId),
  byGuestId: computed(({ entities }) => entities.guests?.byId),
  byIntegrationsId: computed(({ entities }) => entities.integrations?.byId),
  byMemberId: computed(({ entities }) => entities.members?.byId),
  byPaymentId: computed(({ entities }) => entities.payments?.byId),
  byQuestionId: computed(({ entities }) => entities.questions?.byId),
  bySocialsId: computed(({ entities }) => entities.socials?.byId),
  byTypeId: computed(({ entities }) => entities.types?.byId),
  byUserId: computed(({ entities }) => entities.users?.byId),
  byValuesId: computed(({ entities }) => entities.values?.byId),
  byWatchId: computed(({ entities }) => entities.watches?.byId)
};

export default dbByIdStore;
