import { makeVar, ReactiveVar } from '@apollo/client';

// ## ACTIVE ID's

export const communityIdVar: ReactiveVar<string> = makeVar<string>('');
export const eventIdVar: ReactiveVar<string> = makeVar<string>('');
export const memberIdVar: ReactiveVar<string> = makeVar<string>('');
export const userIdVar: ReactiveVar<string> = makeVar<string>('');

// ## LOADER

export const isLoaderShowingVar: ReactiveVar<boolean> = makeVar<boolean>(false);

// ## SIDEBAR

export const isSidebarOpenVar: ReactiveVar<boolean> = makeVar<boolean>(false);
