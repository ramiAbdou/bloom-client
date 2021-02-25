import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ModalType, VerifyEvent } from '@constants';
import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { useStoreActions, useStoreState } from '@store/Store';
import { ErrorType } from '@util/errors';
import { openHref } from '@util/util';

interface VerifiedToken {
  event?: VerifyEvent;
  guestId?: string;
  memberId?: string;
  userId?: string;
}

/**
 * Verifies the login token if one is present in the SearchParams. Will exist
 * if user logs in from email.
 */
const useVerifyToken = (): boolean => {
  const token = new URLSearchParams(window.location.search).get('token');

  const videoUrl = useStoreState(({ db }) => db.event?.videoUrl);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const [verifyToken, result] = useManualQuery<VerifiedToken>({
    fields: ['event'],
    operation: 'verifyToken',
    types: { token: { required: true } }
  });

  const { push } = useHistory();

  useEffect(() => {
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

      // If the token is verified, we push to the pathname (essentially just
      // gets rid of the token attached as a query parameter).
      if (data) push(window.location.pathname);
    })();
  }, [token, videoUrl]);

  const loading = (!!token && !result.data && !result.error) || result.loading;
  useLoader(loading);

  return loading;
};

export default useVerifyToken;
