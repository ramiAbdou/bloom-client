/**
 * @fileoverview Store: Membership
 * - Controls the logic for the active community.
 * @author Rami Abdou
 */

import { Action, action, Computed, computed, Thunk, thunk } from 'easy-peasy';
import Cookie from 'js-cookie';

import { FormQuestion, QuestionType } from '@constants';

type MembershipRole = 'ADMIN' | 'OWNER';

class MembershipQuestion implements Partial<FormQuestion> {
  id: string;

  order: number;

  title: QuestionType;

  type: QuestionType;
}

export type MemberData = { questionId: string; value?: string };

export type SerializedMembershipData = {
  data: MemberData[];
  membershipId: string;
};
type SetMemberDatabaseArgs = {
  questions: MembershipQuestion[];
  members: SerializedMembershipData[];
};

type Community = {
  databaseQuestions: MembershipQuestion[];
  encodedUrlName: string;
  logoUrl: string;
  id: string;
  members: SerializedMembershipData[];
  name: string;
  pendingApplications: SerializedMembershipData[];
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
  memberships: Membership[];
  setActiveMembership: Action<MembershipModel, string>;
  setMemberDatabase: Action<MembershipModel, SetMemberDatabaseArgs>;
  setMemberships: Action<MembershipModel, Membership[]>;
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

  setMemberDatabase: action(
    (
      { activeMembership, memberships, ...state },
      { questions, members }: SetMemberDatabaseArgs
    ) => {
      const activeMembershipId = activeMembership?.id;

      return {
        ...state,
        activeMembership,
        memberships: memberships.map((membership: Membership) => {
          if (membership.id !== activeMembershipId) return membership;
          return {
            ...membership,
            community: {
              ...membership.community,
              databaseQuestions: questions,
              members
            }
          };
        })
      };
    }
  ),

  setMemberships: action((state, memberships: Membership[]) => ({
    ...state,
    memberships: memberships.map((membership: Membership, i: number) => ({
      ...membership,
      isActive: i === 0
    }))
  }))
};
