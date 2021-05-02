import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import { VerifyEvent } from '@util/constants';
import { ErrorType } from '@util/constants.errors';
import { openHref } from '@util/util';

interface VerifyTokenArgs {
  token: string;
}

interface VerifyTokenResult {
  verifyToken: { event?: VerifyEvent; eventId?: string; userId?: string };
}

const VERIFY_TOKEN: DocumentNode = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      event
      eventId
      userId
    }
  }
`;

/**
 * Verifies the login token if one is present in the SearchParams. Will exist
 * if user logs in from email.
 */
const useVerifyToken = (): boolean => {
  const [verifyToken, result] = useMutation<VerifyTokenResult, VerifyTokenArgs>(
    VERIFY_TOKEN
  );

  const token: string = new URLSearchParams(window.location.search).get(
    'token'
  );

  const { push } = useHistory();

  useEffect(() => {
    // If there is no token present, there is nothing to verify. Woohoo!
    if (!token) return;

    (async () => {
      try {
        const { data } = await verifyToken({ variables: { token } });
        const { event, eventId, userId } = data?.verifyToken ?? {};

        if (event === VerifyEvent.LOG_IN) {
          if (userId) userIdVar(userId);
        }

        // If the event is VerifyEvent.JOIN_EVENT, then we need to grab the
        // videoUrl from the backend and open the browser to that.
        if (event === VerifyEvent.JOIN_EVENT) {
          const videoUrl = '';

          // Only open the videoUrl if it's present though!
          if (videoUrl) openHref(videoUrl, false);
        }

        // If the token is verified, we get rid of the token attached as a
        // query parameter.
        push(window.location.pathname);
      } catch (e) {
        if (
          e.message === ErrorType.EVENT_FINISHED ||
          e.message === ErrorType.EVENT_HASNT_STARTED
        ) {
          showModal({ id: ModalType.VIEW_EVENT_ERROR, metadata: e.message });
        }
      }
    })();
  }, [token]);

  const loading: boolean =
    (!!token && !result.data && !result.error) || result.loading;

  return loading;
};

export default useVerifyToken;
