import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useMutation from '@hooks/useMutation';
import { ModalData } from '@organisms/Modal/Modal.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, VerifyEvent } from '@util/constants';
import { ErrorType } from '@util/constants.errors';
import { MutationEvent } from '@util/constants.events';
import { openHref } from '@util/util';

interface VerifiedToken {
  event?: VerifyEvent;
  eventId?: string;
  guestId?: string;
  memberId?: string;
  userId?: string;
}

/**
 * Verifies the login token if one is present in the SearchParams. Will exist
 * if user logs in from email.
 */
const useVerifyToken = (): boolean => {
  const videoUrl: string = useStoreState(({ db }) => db.event?.videoUrl);

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const token: string = new URLSearchParams(window.location.search).get(
    'token'
  );

  const [verifyToken, result] = useMutation<VerifiedToken>({
    fields: ['event'],
    operation: MutationEvent.VERIFY_TOKEN,
    types: { token: { required: true } }
  });

  const { push } = useHistory();

  useEffect(() => {
    // If there is no token present, there is nothing to verify. Woohoo!
    if (!token) return;

    (async () => {
      const { data, error } = await verifyToken({ token });

      if (
        error === ErrorType.EVENT_FINISHED ||
        error === ErrorType.EVENT_HASNT_STARTED
      ) {
        showModal({ id: ModalType.EVENT_ERROR, metadata: error });
      }

      if (data?.event === VerifyEvent.JOIN_EVENT) openHref(videoUrl, false);

      // If the token is verified, we get rid of the token attached as a
      // query parameter.
      if (data) push(window.location.pathname);
    })();
  }, [token, videoUrl]);

  const loading: boolean =
    (!!token && !result.data && !result.error) || result.loading;

  return loading;
};

export default useVerifyToken;
