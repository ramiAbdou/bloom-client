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
 * GENERAL - General constants.
 */

export type CommonProps = { className?: string };
export type ProviderProps = { children: ReactNode };

/**
 * FORMS - Handling of all form-related items including custom Enums.
 */

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
