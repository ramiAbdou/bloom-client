import { computed } from 'easy-peasy';

import { ICommunity, IEvent } from './db.entities';
import { DbModel } from './db.types';
import { updateDocumentColors } from './db.util';

const dbActiveStore: Pick<
  DbModel,
  'community' | 'communityId' | 'event' | 'eventId' | 'memberId' | 'userId'
> = {
  community: computed(({ entities }) => {
    const { activeId, byId } = entities.communities;
    // const { byId: byCommunityIntegrationsId } = entities.communityIntegrations;
    // const { byId: byMemberTypeId } = entities.memberTypes;

    const result: ICommunity = byId[activeId];

    // const communityIntegrations: ICommunityIntegrations =
    //   byCommunityIntegrationsId[result?.communityIntegrations];

    // const hasPaidMembership: boolean = result?.memberTypes
    //   ?.map((memberTypeId: string) => byMemberTypeId[memberTypeId])
    //   ?.some((memberType: IMemberType) => !memberType?.amount);

    if (!result) return null;

    // Updates the primary color (and gray's accordingly).
    updateDocumentColors(result.primaryColor ?? '#f58023');

    return {
      ...result,
      canCollectDues: false
      // hasPaidMembership && !!communityIntegrations?.stripeAccountId
    };
  }),

  communityId: null,

  event: computed(({ entities }) => {
    const { activeId, byId } = entities.events;
    return byId[activeId] as IEvent;
  }),

  eventId: null,
  memberId: null,
  userId: null
};

export default dbActiveStore;
