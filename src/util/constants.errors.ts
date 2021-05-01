export enum ErrorContext {
  LOGIN_ERROR = 'LOGIN_ERROR'
}

export enum ErrorType {
  APPLICATION_PENDING = 'APPLICATION_PENDING',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  EVENT_FINISHED = 'EVENT_FINISHED',
  EVENT_HASNT_STARTED = 'EVENT_HASNT_STARTED',
  NO_MEMBER_APPLICATIONS = 'NO_MEMBER_APPLICATIONS',
  NOT_MEMBER = 'NOT_MEMBER',
  USER_NOT_FOUND = 'USER_NOT_FOUND'
}

export enum TableConstraint {
  MEMBERS_COMMUNITY_ID_EMAIL_UNIQUE = 'members_community_id_email_unique'
}
