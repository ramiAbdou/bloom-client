// ## GRAPHQL EVENTS - Shared between Front-End and Back-End.

export enum MutationEvent {
  APPLY_TO_COMMUNITY = 'applyToCommunity',
  CREATE_COMMUNITY = 'createCommunity',
  CREATE_EVENT = 'createEvent',
  CREATE_EVENT_ATTENDEE_WITH_MEMBER = 'createEventAttendeeWithMember',
  CREATE_EVENT_ATTENDEE_WITH_SUPPORTER = 'createEventAttendeeWithSupporter',
  CREATE_EVENT_GUEST_WITH_MEMBER = 'createEventGuestWithMember',
  CREATE_EVENT_GUEST_WITH_SUPPORTER = 'createEventGuestWithSupporter',
  CREATE_EVENT_WATCH = 'createEventWatch',
  CREATE_MEMBER_TYPES = 'createMemberTypes',
  DELETE_EVENT = 'deleteEvent',
  DELETE_EVENT_GUEST = 'deleteEventGuest',
  DELETE_MEMBERS = 'deleteMembers',
  DEMOTE_MEMBERS = 'demoteMembers',
  INVITE_MEMBERS = 'inviteMembers',
  LOGOUT = 'logout',
  PROMOTE_MEMBERS = 'promoteMembers',
  REMOVE_STRIPE_SUBSCRIPTION_ID = 'removeStripeSubscriptionId',
  RESPOND_TO_APPLICANTS = 'respondToApplicants',
  RESTORE_MEMBERS = 'restoreMembers',
  SEND_LOGIN_LINK = 'sendLoginLink',
  UPDATE_EVENT = 'updateEvent',
  UPDATE_MAILCHIMP_LIST_ID = 'updateMailchimpListId',
  UPDATE_MEMBER = 'updateMember',
  UPDATE_MEMBER_SOCIALS = 'updateMemberSocials',
  UPDATE_MEMBER_VALUES = 'updateMemberValues',
  UPDATE_QUESTION = 'updateQuestion',
  UPDATE_STRIPE_PAYMENT_METHOD_ID = 'updateStripePaymentMethodId',
  UPDATE_STRIPE_SUBSCRIPTION_ID = 'updateStripeSubscriptionId',
  VERIFY_TOKEN = 'verifyToken'
}

export enum QueryEvent {
  GET_ACTIVE_MEMBERS_GROWTH = 'getActiveMembersGrowth',
  GET_ACTIVE_MEMBERS_SERIES = 'getActiveMembersSeries',
  GET_CHANGE_PREVIEW = 'getChangePreview',
  GET_COMMUNITY_INTEGRATIONS = 'getCommunityIntegrations',
  GET_EVENT = 'getEvent',
  GET_EVENT_ATTENDEES_SERIES = 'getEventAttendeesSeries',
  GET_MEMBER_INTEGRATIONS = 'getMemberIntegrations',
  GET_MEMBERS_GROWTH = 'getMembersGrowth',
  GET_MEMBERS_SERIES = 'getMembersSeries',
  GET_OWNER = 'getOwner',
  GET_PAYMENTS_SERIES = 'getPaymentsSeries',
  GET_USER_TOKENS = 'getUserTokens',
  IS_EMAIL_TAKEN = 'isEmailTaken'
}
