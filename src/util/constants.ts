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

export type AggregateCount = {
  aggregate: { count: number };
};

/**
 * SYSTEM TYPES - Includes modal, panel and more.
 */

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
  JOIN_EVENT = 'JOIN_EVENT',
  LOG_IN = 'LOG_IN'
}
