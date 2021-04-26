import { makeVar, ReactiveVar } from '@apollo/client';

export const membersAnalyticsPlaygroundQuestionIdVar: ReactiveVar<string> = makeVar<string>(
  ''
);

interface AnalyticsReactiveFields {
  membersAnalyticsPlaygroundQuestionId: { read: () => string };
}

export const analyticsReactiveFields: AnalyticsReactiveFields = {
  membersAnalyticsPlaygroundQuestionId: {
    read: (): string => membersAnalyticsPlaygroundQuestionIdVar()
  }
};
