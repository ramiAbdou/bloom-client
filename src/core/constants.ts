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

export type ClassNameProps = { className?: string };
export type OnClickProps = { onClick?: () => Promise<any> };
export type ProviderProps = { children: ReactNode };
export type StyleProps = { style?: React.CSSProperties };

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

export type ApplicationParams = { encodedUrlName: string };

export type QuestionType =
  | 'LONG_TEXT'
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_SELECT'
  | 'SHORT_TEXT';

export type QuestionCategory =
  | 'DATE_JOINED'
  | 'EMAIL'
  | 'FIRST_NAME'
  | 'GENDER'
  | 'LAST_NAME'
  | 'MEMBERSHIP_TYPE';

export type FormQuestion = {
  category?: QuestionCategory;
  description?: string;
  id?: string;
  required?: boolean;
  options?: string[];
  title: string;
  type?: QuestionType;
};

export type Form = {
  title: string;
  description?: string;
  questions?: FormQuestion[];
};

export type FormData = { questionId: string; value: string[] }[];
