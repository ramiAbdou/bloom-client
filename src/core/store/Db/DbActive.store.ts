import { computed } from 'easy-peasy';

import {
  IApplication,
  ICommunity,
  ICommunityIntegrations,
  IEvent,
  IMember,
  IMemberIntegrations,
  IMemberSocials,
  IMemberType,
  IUser
} from '@store/Db/entities';
import { DbModel } from './Db.types';
import { updateDocumentColors } from './Db.util';

const dbActiveStore: Pick<
  DbModel,
  | 'application'
  | 'community'
  | 'communityIntegrations'
  | 'event'
  | 'member'
  | 'memberIntegrations'
  | 'socials'
  | 'user'
> = {
  application: computed(({ community, entities }) => {
    const { byId: byApplicationId } = entities.applications;
    return byApplicationId[community?.application] as IApplication;
  }),

  community: computed(({ entities }) => {
    const { activeId, byId } = entities.communities;
    const { byId: byCommunityIntegrationsId } = entities.communityIntegrations;
    const { byId: byMemberTypeId } = entities.memberTypes;

    const result: ICommunity = byId[activeId];

    const communityIntegrations: ICommunityIntegrations =
      byCommunityIntegrationsId[result?.communityIntegrations];

    const hasPaidMembership: boolean = result?.memberTypes
      ?.map((memberTypeId: string) => byMemberTypeId[memberTypeId])
      ?.some((memberType: IMemberType) => !memberType?.isFree);

    if (!result) return null;

    // Updates the primary color (and gray's accordingly).
    updateDocumentColors(result.primaryColor ?? '#f58023');

    return {
      ...result,
      canCollectDues:
        hasPaidMembership && !!communityIntegrations?.stripeAccountId
    };
  }),

  communityIntegrations: computed(({ community, entities }) => {
    const { byId: byCommunityIntegrationsId } = entities.communityIntegrations;

    return byCommunityIntegrationsId[
      community?.communityIntegrations
    ] as ICommunityIntegrations;
  }),

  event: computed(({ entities }) => {
    const { activeId, byId } = entities.events;
    return byId[activeId] as IEvent;
  }),

  member: computed(({ entities }) => {
    const { activeId, byId } = entities.members;
    return byId[activeId] as IMember;
  }),

  memberIntegrations: computed(({ entities, member }) => {
    const { byId } = entities.memberIntegrations;
    return byId[member?.memberIntegrations] as IMemberIntegrations;
  }),

  socials: computed(({ entities, member }) => {
    const { byId: bySocialsId } = entities.socials;
    return bySocialsId[member?.socials] as IMemberSocials;
  }),

  user: computed(({ entities }) => {
    const { activeId, byId } = entities.users;
    return byId[activeId] as IUser;
  })
};

export default dbActiveStore;
