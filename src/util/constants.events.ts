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
  GET_APPLICATION = 'getApplication',
  GET_CHANGE_PREVIEW = 'getChangePreview',
  GET_COMMUNITY = 'getCommunity',
  GET_COMMUNITY_INTEGRATIONS = 'getCommunityIntegrations',
  GET_EVENT = 'getEvent',
  GET_EVENT_ATTENDEES_SERIES = 'getEventAttendeesSeries',
  GET_MEMBER_INTEGRATIONS = 'getMemberIntegrations',
  GET_MEMBER_SOCIALS = 'getMemberSocials',
  GET_MEMBER = 'getMember',
  GET_MEMBERS_GROWTH = 'getMembersGrowth',
  GET_MEMBERS_SERIES = 'getMembersSeries',
  GET_OWNER = 'getOwner',
  GET_PAYMENTS_SERIES = 'getPaymentsSeries',
  GET_USER = 'getUser',
  GET_USER_TOKENS = 'getUserTokens',
  IS_EMAIL_TAKEN = 'isEmailTaken',
  LIST_APPLICANTS = 'listApplicants',
  LIST_COMMUNITIES = 'listCommunities',
  LIST_EVENT_ATTENDEES = 'listEventAttendees',
  LIST_EVENT_GUESTS = 'listEventGuests',
  LIST_EVENT_WATCHES = 'listEventWatches',
  LIST_MEMBER_TYPES = 'listMemberTypes',
  LIST_MEMBER_SOCIALS = 'listMemberSocials',
  LIST_MEMBER_VALUES = 'listMemberValues',
  LIST_MEMBERS = 'listMembers',
  LIST_PAST_EVENTS = 'listPastEvents',
  LIST_PAYMENTS = 'listPayments',
  LIST_QUESTIONS = 'listQuestions',
  LIST_RANKED_QUESTIONS = 'listRankedQuestions',
  LIST_UPCOMING_EVENT_GUESTS = 'listUpcomingEventGuests',
  LIST_UPCOMING_EVENTS = 'listUpcomingEvents'
}
