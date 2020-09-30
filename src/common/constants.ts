/**
 * @fileoverview Utility: Constants
 * @author Rami Abdou
 */

import { ReactNode } from 'react';

const isProduction = process.env.NODE_ENV === 'production';
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

export type ProviderProps = { children: ReactNode };

export enum FormQuestionCategory {
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  EMAIL = 'EMAIL',
  GENDER = 'GENDER',
  MEMBERSHIP_TYPE = 'MEMBERSHIP_TYPE'
}

export enum FormQuestionType {
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  DROPDOWN = 'DROPDOWN',
  DROPDOWN_MULTIPLE = 'DROPDOWN_MULTIPLE'
}

export type FormOption = { bgColor: string; value: string };

export type FormQuestion = {
  category?: FormQuestionCategory;
  description?: string;
  options?: string[] | FormOption[];
  required?: boolean;
  title: string;
  type?: FormQuestionType;
};

export type Form = {
  title: string;
  description?: string;
  questions: FormQuestion[];
};

export type FormData = {
  category?: FormQuestionCategory;
  title?: string;
  value: string;
}[];
