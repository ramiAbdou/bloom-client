import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { modalVar } from '@core/state/Modal.reactive';
import useIsMember from '@hooks/useIsMember';
import { ModalType } from '@util/constants';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import { ErrorContext } from '@util/constants.errors';

const useShowCheckInEventModal = (event: IEvent): void => {
  const communityId: string = useReactiveVar(communityIdVar);
  const isMember: boolean = useIsMember();
  const isMembersOnly: boolean = event?.privacy === EventPrivacy.MEMBERS_ONLY;
  const hasCookieError: boolean = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  // If not a member of the community, and it's a member's only
  // event or there was an issue logging in, show a locked modal.
  useEffect(() => {
    if (!event) return;

    if (!isMember && !!communityId && (isMembersOnly || hasCookieError)) {
      modalVar({
        id: ModalType.CHECK_IN,
        metadata: event,
        options: { lock: isMembersOnly }
      });
    }
  }, [communityId, event, hasCookieError, isMember, isMembersOnly]);
};

export default useShowCheckInEventModal;
