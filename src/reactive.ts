import { makeVar, ReactiveVar } from '@apollo/client';

export const communityIdVar: ReactiveVar<string> = makeVar<string>('');
export const eventIdVar: ReactiveVar<string> = makeVar<string>('');
export const memberIdVar: ReactiveVar<string> = makeVar<string>('');
export const userIdVar: ReactiveVar<string> = makeVar<string>('');

// ## DIRECTORY

export const directoryIsAdminsOnlyVar: ReactiveVar<boolean> = makeVar<boolean>(
  false
);
export const directorySearchStringVar: ReactiveVar<string> = makeVar<string>(
  ''
);
