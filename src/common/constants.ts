/**
 * @fileoverview Utility: Constants
 * @author Rami Abdou
 */

const isProduction = process.env.NODE_ENV === 'production';

export const APP = {
  CLIENT_URL: isProduction
    ? process.env.APP_CLIENT_URL
    : 'http://localhost:3000',
  SERVER_URL: isProduction
    ? process.env.APP_SERVER_URL
    : 'http://localhost:8080'
};

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

export type FormItem = {
  category?: FormQuestionCategory;
  description?: string;
  options: string[];
  required?: boolean;
  title: string;
  type: FormQuestionType;
};

export type Form = { title: string; description?: string; items: FormItem[] };
