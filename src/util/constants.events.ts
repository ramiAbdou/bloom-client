export enum MutationEvent {
  APPLY_TO_COMMUNITY = 'applyToCommunity',
  CREATE_EVENT_ATTENDEE_WITH_SUPPORTER = 'createEventAttendeeWithSupporter',
  CREATE_EVENT_GUEST_WITH_SUPPORTER = 'createEventGuestWithSupporter',
  INVITE_MEMBERS = 'inviteMembers',
  LOGOUT = 'logout',
  SEND_LOGIN_LINK = 'sendLoginLink',
  UPDATE_MAILCHIMP_LIST_ID = 'updateMailchimpListId',
  UPDATE_MEMBER_VALUES = 'updateMemberValues',
  UPDATE_STRIPE_PAYMENT_METHOD_ID = 'updateStripePaymentMethodId',
  UPDATE_STRIPE_SUBSCRIPTION_ID = 'updateStripeSubscriptionId',
  VERIFY_TOKEN = 'verifyToken'
}
