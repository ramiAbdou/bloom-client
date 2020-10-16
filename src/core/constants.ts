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

export const COLORS = [
  '#FAA21E7F',
  '#018A8A7F',
  '#F580237F',
  '#2FAA3B7F',
  '#EF41237F',
  '#F156277F',
  '#EF41237F'
];

/**
 * GENERAL - General constants.
 */

export type ProviderProps = { children: ReactNode };

/**
 * FORMS - Handling of all form-related items including custom Enums.
 */

export type QuestionType =
  | 'DROPDOWN_MULTIPLE'
  | 'LONG_TEXT'
  | 'MULTIPLE_CHOICE'
  | 'SHORT_TEXT';

export type QuestionCategory =
  | 'DATE_JOINED'
  | 'EMAIL'
  | 'FIRST_NAME'
  | 'GENDER'
  | 'LAST_NAME'
  | 'MEMBERSHIP_TYPE';

export type FormOption = { bgColor: string; value: string };

export type FormQuestion = {
  category?: QuestionCategory;
  description?: string;
  required?: boolean;
  options?: FormOption[];
  title: string;
  type: QuestionType;
};

export type Form = {
  title: string;
  description?: string;
  questions: FormQuestion[];
};

export type FormData = {
  category?: QuestionCategory;
  title?: string;
  value: string;
}[];
