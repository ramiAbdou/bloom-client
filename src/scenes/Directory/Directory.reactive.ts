import { makeVar, ReactiveVar } from '@apollo/client';

export const directorySearchStringVar: ReactiveVar<string> = makeVar<string>(
  ''
);
