/**
 * @fileoverview Utility: Constants
 * @author Rami Abdou
 */

import { ReactNode } from 'react';

export const isProduction = process.env.NODE_ENV === 'production';

/**
 * APP - Application and Bloom-specific constants.
 */

export const APP = {
  CLIENT_URL: isProduction
    ? process.env.APP_CLIENT_URL
    : 'http://localhost:3000',
  SERVER_URL: isProduction
    ? process.env.APP_SERVER_URL
    : 'http://localhost:8080'
};

/**
 * GENERAL PROPS - General component props.
 */

export type Function =
  | ((...args: any) => Promise<any>)
  | ((...args: any) => void)
  | VoidFunction;

export type ChildrenProps = { children: ReactNode };
export type ClassNameProps = { className?: string };
export type IdProps = { id: string };
export type IsShowingProps = { isShowing: boolean };
export type LoadingProps = { loading: boolean };
export type OnClickProps = { onClick?: Function };
export type MessageProps = { message: string };
export type RefProps = { ref: React.MutableRefObject<any> };
export type StyleProps = { style?: React.CSSProperties };
export type ValueProps = { value: any };

/**
 * GENERAL - General constants.
 */

export type LoginError =
  | 'APPLICATION_PENDING'
  | 'APPLICATION_REJECTED'
  | 'USER_NOT_FOUND';

/**
 * FORMS - Handling of all form-related items including custom Enums.
 */

export type EncodedUrlNameParams = { encodedUrlName: string };

export type QuestionType =
  | 'CUSTOM'
  | 'LONG_TEXT'
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_SELECT'
  | 'SHORT_TEXT';

export type QuestionCategory =
  | 'EMAIL'
  | 'FIRST_NAME'
  | 'GENDER'
  | 'JOINED_ON'
  | 'LAST_NAME'
  | 'MEMBERSHIP_TYPE';
