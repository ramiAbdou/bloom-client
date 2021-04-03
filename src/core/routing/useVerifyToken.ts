import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useMutation from '@gql/useMutation';
import useManualQuery from '@gql/useManualQuery';
import { ModalData } from '@organisms/Modal/Modal.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { ModalType, VerifyEvent } from '@util/constants';
import { ErrorType } from '@util/constants.errors';
import { MutationEvent, QueryEvent } from '@util/constants.events';
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
  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const token: string = new URLSearchParams(window.location.search).get(
    'token'
  );

  const [verifyToken, result1] = useMutation<VerifiedToken>({
    fields: ['event', 'eventId'],
    operation: MutationEvent.VERIFY_TOKEN,
    types: { token: { required: true } }
  });

  const [getEvent, result2] = useManualQuery<IEvent>({
    fields: ['videoUrl'],
    operation: QueryEvent.GET_EVENT,
    schema: Schema.EVENT,
    types: { eventId: { required: true } }
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

      // If there is no data, then there is nothing left to query/do.
      if (!data) return;

      // If the event is VerifyEvent.JOIN_EVENT, then we need to grab the
      // videoUrl from the backend and open the browser to that.
      if (data.event === VerifyEvent.JOIN_EVENT) {
        const videoUrl: string = (await getEvent({ eventId: data?.eventId }))
          .data?.videoUrl;

        // Only open the videoUrl if it's present though!
        if (videoUrl) openHref(videoUrl, false);
      }

      // If the token is verified, we get rid of the token attached as a
      // query parameter.
      push(window.location.pathname);
    })();
  }, [token]);

  const loading: boolean =
    (!!token && !result1.data && !result1.error) ||
    result1.loading ||
    result2.loading;

  return loading;
};

export default useVerifyToken;
