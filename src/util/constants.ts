import { ReactNode } from 'react';

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

export type ChildrenProps = { children?: ReactNode };
export type ClassNameProps = { className?: string };
export type UrlNameProps = { urlName?: string };
export type IdProps = { id?: string };
export type IsActiveProps = { isActive?: boolean };
export type LoadingProps = { loading?: boolean };
export type OnClickProps = { onClick?: VoidFunction };
export type MessageProps = { message?: string };
export type StyleProps = { style?: React.CSSProperties };
export type TitleProps = { title?: string };
export type ValueProps = { value?: any };

/**
 * SYSTEM TYPES - Includes modal, panel and more.
 */

export enum ModalType {
  ADD_ADMINS = 'ADD_ADMINS',
  ADD_MEMBERS = 'ADD_MEMBERS',
  CHANGE_MEMBERSHIP = 'CHANGE_MEMBERSHIP',
  DELETE_ADMINS = 'DELETE_ADMINS',
  DELETE_MEMBERS = 'DELETE_MEMBERS',
  DEMOTE_TO_MEMBER = 'DEMOTE_TO_MEMBER',
  DIRECTORY_CARD = 'DIRECTORY_CARD',
  EDIT_MEMBERSHIP_INFORMATION = 'EDIT_MEMBERSHIP_INFORMATION',
  EDIT_PERSONAL_INFORMATION = 'EDIT_PERSONAL_INFORMATION',
  EDIT_SOCIAL_MEDIA = 'EDIT_SOCIAL_MEDIA',
  MAILCHIMP_FLOW = 'MAILCHIMP_FLOW',
  PAY_DUES = 'PAY_DUES',
  PROMOTE_TO_ADMIN = 'PROMOTE_TO_ADMIN',
  UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD'
}

export enum PanelType {
  PROFILE = 'PROFILE'
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
 * FORMS - Handling of all form-related items including custom Enums.
 */

export type QuestionType =
  | 'CUSTOM'
  | 'IMAGE'
  | 'LONG_TEXT'
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_SELECT'
  | 'SHORT_TEXT'
  | 'TOGGLE';

export type QuestionCategory =
  | 'CREDIT_OR_DEBIT_CARD'
  | 'EMAIL'
  | 'FIRST_NAME'
  | 'GENDER'
  | 'JOINED_AT'
  | 'LAST_NAME'
  | 'MEMBERSHIP_TYPE';

/**
 * MISC - Other miscelleaneous types.
 */

export interface TimeSeriesResult {
  name: string;
  value: number;
}
