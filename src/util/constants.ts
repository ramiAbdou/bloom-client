export const isProduction = process.env.NODE_ENV === 'production';

/**
 * APP - Application and Bloom-specific constants.
 */

export const APP = {
  CLIENT_URL: isProduction
    ? process.env.APP_CLIENT_URL
    : 'http://localhost:3000',
  NGROK_SERVER_URL: process.env.APP_NGROK_SERVER_URL,
  SERVER_URL: isProduction
    ? process.env.APP_SERVER_URL
    : 'http://localhost:8080'
};

/**
 * GENERAL PROPS - General component props.
 */

export type ClassNameProps = { className?: string };
export type IdProps = { id?: string };
export type LoadingProps = { loading?: boolean };
export type OnClickProps = { onClick?: VoidFunction };
export type ShowProps = { show?: boolean };
export type StyleProps = { style?: React.CSSProperties };
export type TitleProps = { title?: string };
export type UrlNameProps = { urlName?: string };
export type ValueProps = { value?: any };

export interface BaseProps extends ClassNameProps, ShowProps, StyleProps {}

/**
 * SYSTEM TYPES - Includes modal, panel and more.
 */

export enum CookieType {
  LOGIN_ERROR = 'LOGIN_ERROR'
}

export enum ModalType {
  ADD_ADMINS = 'ADD_ADMINS',
  ADD_MEMBERS = 'ADD_MEMBERS',
  APPLICANT = 'APPLICANT',
  CHANGE_MEMBERSHIP = 'CHANGE_MEMBERSHIP',
  CHECK_IN = 'CHECK_IN',
  CREATE_EVENT = 'CREATE_EVENT',
  DELETE_ADMINS = 'DELETE_ADMINS',
  DELETE_MEMBERS = 'DELETE_MEMBERS',
  DEMOTE_MEMBERS = 'DEMOTE_MEMBERS',
  EDIT_MEMBERSHIP_INFORMATION = 'EDIT_MEMBERSHIP_INFORMATION',
  EDIT_PERSONAL_INFORMATION = 'EDIT_PERSONAL_INFORMATION',
  EDIT_SOCIAL_MEDIA = 'EDIT_SOCIAL_MEDIA',
  MAILCHIMP_FLOW = 'MAILCHIMP_FLOW',
  MEMBER_PROFILE = 'MEMBER_PROFILE',
  PAY_DUES = 'PAY_DUES',
  PROMOTE_TO_ADMIN = 'PROMOTE_TO_ADMIN',
  UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD'
}

export enum PanelType {
  ADD_RECORDING_LINK = 'ADD_RECORDING_LINK',
  PROFILE = 'PROFILE',
  TABLE_FILTER = 'TABLE_FILTER'
}

export type RouteType =
  | '/'
  | 'analytics'
  | 'applicants'
  | 'database'
  | 'directory'
  | 'events'
  | 'integrations'
  | 'members'
  | 'membership'
  | 'profile';

/**
 * MISC - Other miscelleaneous types.
 */

export type QuestionCategory =
  | 'CREDIT_OR_DEBIT_CARD'
  | 'DUES_STATUS'
  | 'EMAIL'
  | 'FIRST_NAME'
  | 'GENDER'
  | 'JOINED_AT'
  | 'LAST_NAME'
  | 'MEMBERSHIP_TYPE';

export type QuestionType =
  | 'COVER_IMAGE'
  | 'CUSTOM'
  | 'DATE'
  | 'IMAGE'
  | 'LARGE_TITLE'
  | 'LONG_TEXT'
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_SELECT'
  | 'SHORT_TEXT'
  | 'TIME'
  | 'TOGGLE'
  | 'TRUE_FALSE';

export interface PopulateArgs {
  populate?: string[];
}

export interface TimeSeriesData {
  name: string;
  value: number;
}
