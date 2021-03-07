import { computed } from 'easy-peasy';

import {
  IApplication,
  ICommunity,
  IEvent,
  IIntegrations,
  IMember,
  IMemberIntegrations,
  IMemberPlan,
  IMemberSocials,
  IUser
} from '@store/Db/entities';
import { DbModel } from './Db.types';
import { updateDocumentColors } from './Db.util';

const dbActiveStore: Pick<
  DbModel,
  | 'application'
  | 'community'
  | 'event'
  | 'integrations'
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
    const { byId: byIntegrationsId } = entities.integrations;
    const { byId: byMemberPlanId } = entities.memberPlans;

    const result: ICommunity = byId[activeId];
    const integrations: IIntegrations = byIntegrationsId[result?.integrations];

    const hasPaidMembership: boolean = result?.plans
      ?.map((planId: string) => byMemberPlanId[planId])
      ?.some((plan: IMemberPlan) => !plan?.isFree);

    if (!result) return null;

    // Updates the primary color (and gray's accordingly).
    updateDocumentColors(result.primaryColor ?? '#f58023');

    return {
      ...result,
      canCollectDues: hasPaidMembership && !!integrations?.stripeAccountId
    };
  }),

  event: computed(({ entities }) => {
    const { activeId, byId } = entities.events;
    return byId[activeId] as IEvent;
  }),

  integrations: computed(({ community, entities }) => {
    const { byId: byIntegrationId } = entities.integrations;
    return byIntegrationId[community?.integrations] as IIntegrations;
  }),

  member: computed(({ entities }) => {
    const { activeId, byId } = entities.members;
    return byId[activeId] as IMember;
  }),

  memberIntegrations: computed(({ entities, member }) => {
    const { byId } = entities.memberIntegrations;
    return byId[member?.memberIntegrations] as IMemberIntegrations;
  }),

  socials: computed(({ entities }) => {
    const { activeId, byId } = entities.members;
    const { byId: bySocialsId } = entities.socials;

    const member: IMember = byId[activeId];
    return bySocialsId[member?.socials] as IMemberSocials;
  }),

  user: computed(({ entities }) => {
    const { activeId, byId } = entities.users;
    return byId[activeId] as IUser;
  })
};

export default dbActiveStore;