import { nanoid } from 'nanoid';

import { makeVar, ReactiveVar } from '@apollo/client';

// ## ACTIVE ID's

export const communityIdVar: ReactiveVar<string> = makeVar<string>(null);

/**
 * Sets the active communityId and adds it to the localStorage. This will
 * allow us to include it in our GraphQL request headers.
 */
export const setCommunityId = (communityId: string): void => {
  communityIdVar(communityId);
  localStorage.setItem('communityId', communityId);
};

export const eventIdVar: ReactiveVar<string> = makeVar<string>(null);

export const memberIdVar: ReactiveVar<string> = makeVar<string>(null);

/**
 * Sets the active memberId and adds it to the localStorage. This will
 * allow us to include it in our GraphQL request headers.
 */
export const setMemberId = (memberId: string): void => {
  memberIdVar(memberId);
  localStorage.setItem('memberId', memberId);
};

export const userIdVar: ReactiveVar<string> = makeVar<string>(null);

// ## LOADER

export const isLoaderShowingVar: ReactiveVar<boolean> = makeVar<boolean>(false);

// ## SIDEBAR

export const isSidebarOpenVar: ReactiveVar<boolean> = makeVar<boolean>(false);

// ## TOAST

export interface ToastData {
  id: string;
  message: string;
}

interface ToastHook {
  dequeueToast: (toastId: string) => void;
  showToast: (toastData: Pick<ToastData, 'message'>) => void;
}

export const toastQueueVar: ReactiveVar<ToastData[]> = makeVar<ToastData[]>([]);

export const showToast = ({ message }: Pick<ToastData, 'message'>): void => {
  toastQueueVar([...toastQueueVar(), { id: nanoid(), message }]);
};

export const useToast = (toastVar: ReactiveVar<ToastData[]>): ToastHook => {
  return {
    dequeueToast: (toastId: string) => {
      toastVar([
        ...toastVar().filter((value: ToastData) => value.id !== toastId)
      ]);
    },

    showToast: ({ message }: Pick<ToastData, 'message'>): void => {
      toastVar([...toastVar(), { id: nanoid(), message }]);
    }
  };
};
