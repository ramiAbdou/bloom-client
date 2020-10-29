/**
 * @fileoverview Store: Membership
 * - Controls the logic for the active community.
 * @author Rami Abdou
 */

import { Action, action, Computed, computed, Thunk, thunk } from 'easy-peasy';
import Cookie from 'js-cookie';

import { FormQuestion, QuestionType } from '@constants';

type MembershipRole = 'ADMIN' | 'OWNER';

class ApplicationQuestion implements Partial<FormQuestion> {
  id: string;

  order: number;

  title: QuestionType;

  type: QuestionType;
}

type PendingApplicationData = { questionId: string; value?: string };

export type PendingApplication = {
  data: PendingApplicationData[];
  membershipId: string;
};

type SetPendingApplicationArgs = {
  questions: ApplicationQuestion[];
  applications: PendingApplication[];
};

type Community = {
  applicationQuestions: ApplicationQuestion[];
  encodedUrlName: string;
  logoUrl: string;
  id: string;
  name: string;
  pendingApplications: PendingApplication[];
  primaryColor: string;
};

export type Membership = {
  community: Community;
  id: string;
  isActive?: boolean;
  role: MembershipRole;
};

export type MembershipModel = {
  activeMembership: Computed<MembershipModel, Membership>;
  init: Thunk<MembershipModel, Membership[]>;
  isAdmin: Computed<MembershipModel, (encodedUrlName: string) => boolean>;
  isMember: Computed<MembershipModel, (encodedUrlName: string) => boolean>;
  isOwner: Computed<MembershipModel, (encodedUrlName: string) => boolean>;
  memberships: Membership[];
  setActiveMembership: Action<MembershipModel, string>;
  setMemberships: Action<MembershipModel, Membership[]>;
  setPendingApplications: Action<MembershipModel, SetPendingApplicationArgs>;
};

export const membershipModel: MembershipModel = {
  activeMembership: computed(({ memberships }) =>
    memberships.find(({ isActive }: Membership) => isActive)
  ),

  init: thunk((actions, memberships: Membership[]) => {
    // If the array is not populated, then don't set the memberships.
    if (!memberships?.length) return;

    // Update all of the memberships.
    actions.setMemberships(memberships);

    // Set the active membership to be the first of the array. Remember that
    // this is only going to be called when the app is first loaded.
    const { id, community } = memberships[0];
    actions.setActiveMembership(id);

    // We use the client-side cookie for some GraphQL requests, so we set the
    // cookies to be the first membership's community ID.
    Cookie.set('communityId', community.id);
  }),

  /**
   * Returns true if there is any membership that has the same encodedUrlName
   * as the one given.
   */
  isAdmin: computed(({ memberships }) => (encodedUrlName: string) =>
    memberships?.some(
      ({ community, role }) =>
        !!role && community.encodedUrlName === encodedUrlName
    )
  ),

  /**
   * Returns true if there is any membership that has the same encodedUrlName
   * as the one given.
   */
  isMember: computed(({ memberships }) => (encodedUrlName: string) =>
    memberships?.some(
      ({ community }) => encodedUrlName === community.encodedUrlName
    )
  ),

  /**
   * Returns true if there is any membership that has the same encodedUrlName
   * as the one given.
   */
  isOwner: computed(({ memberships }) => (encodedUrlName: string) =>
    memberships?.some(
      ({ community, role }) =>
        role === 'OWNER' && community.encodedUrlName === encodedUrlName
    )
  ),

  memberships: [],

  setActiveMembership: action((state, membershipId: string) =>
    // Update the memberships array by setting the isActive: true for the
    // membership with the given membershipId.
    ({
      ...state,
      memberships: state.memberships.map((membership: Membership) => ({
        ...membership,
        isActive: membership.id === membershipId
      }))
    })
  ),

  setMemberships: action((state, memberships: Membership[]) => ({
    ...state,
    memberships: memberships.map((membership: Membership, i: number) => ({
      ...membership,
      isActive: i === 0
    }))
  })),

  setPendingApplications: action(
    (
      { activeMembership, memberships, ...state },
      { applications, questions }: SetPendingApplicationArgs
    ) => {
      const activeMembershipId = activeMembership?.id;

      return {
        ...state,
        activeMembership,
        memberships: memberships.map((membership: Membership) => {
          if (membership.id !== activeMembershipId) return membership;

          const { community } = membership;
          return {
            ...membership,
            community: {
              ...community,
              applicationQuestions: questions,
              pendingApplications: applications
            }
          };
        })
      };
    }
  )
};
