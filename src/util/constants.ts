import { FunctionComponent } from 'react';

import { DocumentNode } from '@apollo/client';

/**
 * APP - Application and Bloom-specific constants.
 */

export const APP = {
  CLIENT_URL: process.env.APP_CLIENT_URL,
  NGROK_SERVER_URL: process.env.APP_NGROK_SERVER_URL,
  SERVER_URL: process.env.APP_SERVER_URL
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

export type ComponentWithData<T, S = unknown> = FunctionComponent<
  S & { data?: Partial<T> }
>;

export interface ComponentWithFragments<T, S = unknown>
  extends FunctionComponent<S & { data: Partial<T> }> {
  fragment: DocumentNode;
}

/**
 * SYSTEM TYPES - Includes modal, panel and more.
 */

export enum ModalType {
  ADD_MEMBERS = 'ADD_MEMBERS',
  APPLICANT = 'APPLICANT',
  APPLICANT_CONFIRMATION = 'APPLICANT_CONFIRMATION',
  CHANGE_MEMBERSHIP = 'CHANGE_MEMBERSHIP',
  CHECK_IN = 'CHECK_IN',
  CONFIRM_DELETE_EVENT = 'CONFIRM_DELETE_EVENT',
  CONFIRM_RSVP = 'CONFIRM_RSVP',
  CREATE_EVENT = 'CREATE_EVENT',
  DELETE_ADMINS = 'DELETE_ADMINS',
  DELETE_MEMBERS = 'DELETE_MEMBERS',
  DEMOTE_MEMBERS = 'DEMOTE_MEMBERS',
  EDIT_MEMBERSHIP_INFORMATION = 'EDIT_MEMBERSHIP_INFORMATION',
  EDIT_PERSONAL_INFORMATION = 'EDIT_PERSONAL_INFORMATION',
  EDIT_SOCIAL_MEDIA = 'EDIT_SOCIAL_MEDIA',
  EVENT_ERROR = 'EVENT_ERROR',
  INTEGRATIONS_DETAILS = 'INTEGRATIONS_DETAILS',
  MAILCHIMP_FLOW = 'MAILCHIMP_FLOW',
  PROFILE = 'PROFILE',
  PAY_DUES = 'PAY_DUES',
  PROMOTE_MEMBERS = 'PROMOTE_MEMBERS',
  UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD'
}

export enum PanelType {
  ADD_RECORDING_LINK = 'ADD_RECORDING_LINK',
  FILTER_DIRECTORY = 'FILTER_DIRECTORY',
  FILTER_TABLE = 'FILTER_TABLE',
  PROFILE = 'PROFILE',
  TABLE_COLUMN = 'TABLE_COLUMN'
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

export enum QuestionCategory {
  BIO = 'BIO',
  DUES_STATUS = 'DUES_STATUS',
  EMAIL = 'EMAIL',
  EVENTS_ATTENDED = 'EVENTS_ATTENDED',
  FACEBOOK_URL = 'FACEBOOK_URL',
  FIRST_NAME = 'FIRST_NAME',
  GENDER = 'GENDER',
  INSTAGRAM_URL = 'INSTAGRAM_URL',
  JOINED_AT = 'JOINED_AT',
  LAST_NAME = 'LAST_NAME',
  LINKED_IN_URL = 'LINKED_IN_URL',
  MEMBER_TYPE = 'MEMBER_TYPE',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  TWITTER_URL = 'TWITTER_URL'
}

export enum QuestionType {
  COVER_IMAGE = 'COVER_IMAGE',
  DATE = 'DATE',
  IMAGE = 'IMAGE',
  LONG_TEXT = 'LONG_TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT',
  SHORT_TEXT = 'SHORT_TEXT',
  TIME = 'TIME',
  TOGGLE = 'TOGGLE',
  TRUE_FALSE = 'TRUE_FALSE'
}

export enum SocialBrand {
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  LINKED_IN = 'LINKED_IN',
  TWITTER = 'TWITTER'
}

export type Spacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface TimeSeriesData {
  name: string;
  value: number;
}

export enum VerifyEvent {
  JOIN_EVENT = 'JOIN_EVENT'
}
