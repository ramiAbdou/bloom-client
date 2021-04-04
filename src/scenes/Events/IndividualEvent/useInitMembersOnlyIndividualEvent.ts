import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EventPrivacy } from '@store/Db/Db.entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { ErrorContext } from '@util/constants.errors';

const useInitMembersOnlyIndividualEvent = (): void => {
  const { eventId } = useParams() as { eventId: string };

  const isMember: boolean = useStoreState(({ db }) => db.isMember);

  const isMembersOnly: boolean = useStoreState(
    ({ db }) => db.event?.privacy === EventPrivacy.MEMBERS_ONLY
  );

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const hasCookieError: boolean = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  // If not a member of the community, and it's a member's only
  // event or there was an issue logging in, show a locked modal.
  useEffect(() => {
    if (!isMember && (isMembersOnly || hasCookieError)) {
      showModal({
        id: ModalType.CHECK_IN,
        metadata: eventId,
        options: { lock: isMembersOnly }
      });
    }
  }, [hasCookieError, isMember, isMembersOnly]);
};

export default useInitMembersOnlyIndividualEvent;
