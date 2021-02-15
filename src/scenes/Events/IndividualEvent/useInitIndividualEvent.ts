import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CookieType, ModalType } from '@constants';
import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import useLoader from '@organisms/Loader/useLoader';
import { ICommunity, IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { eventFields, GetEventArgs } from '../Events.types';

const useInitIndividualEvent = (): boolean => {
  const { eventId } = useParams() as { eventId: string };

  const communityId = useStoreState(({ db }) => db.community?.id);
  const isMember = useStoreState(({ db }) => db.isMember);
  const isMembersOnly = useStoreState(({ db }) => db.event?.private);
  const setActive = useStoreActions(({ db }) => db.setActive);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { data: data1, loading: loading1 } = useQuery<IEvent, GetEventArgs>({
    fields: [
      'description',
      'endTime',
      'eventUrl',
      'id',
      'imageUrl',
      'private',
      'recordingUrl',
      'startTime',
      'summary',
      'title',
      'videoUrl',
      { community: ['id'] }
    ],
    operation: 'getEvent',
    schema: Schema.EVENT,
    types: { eventId: { required: true } },
    variables: { eventId }
  });

  const { loading: loading2 } = useQuery<IEvent, GetEventArgs>({
    fields: eventFields,
    operation: 'getEventGuests',
    schema: [Schema.EVENT_GUEST],
    types: { eventId: { required: false } },
    variables: { eventId }
  });

  const [getCommunity, { loading: loading3 }] = useManualQuery<ICommunity>({
    fields: ['id', 'name', 'primaryColor'],
    operation: 'getCommunity',
    schema: Schema.COMMUNITY,
    types: { communityId: { required: false } }
  });

  const hasCookieError = !!Cookies.get(CookieType.LOGIN_ERROR);

  useEffect(() => {
    if (data1) {
      setActive({ id: data1.id, table: 'events' });
      // @ts-ignore b/c type issues.
      setActive({ id: data1.community?.id, table: 'communities' });
    }
  }, [data1]);

  // If the user isn't a member of the community, and it's a member's only
  // event or there was an issue logging in, show a locked modal.
  useEffect(() => {
    if (!isMember && (isMembersOnly || hasCookieError)) {
      showModal({
        id: ModalType.CHECK_IN,
        metadata: eventId,
        options: { lock: true }
      });
    }
  }, [hasCookieError, isMember, isMembersOnly]);

  // If the user isn't a member of the community, then we need to load the
  // community's name and primary color as well.
  useEffect(() => {
    (async () => {
      if (communityId && !isMember) await getCommunity({ communityId });
    })();
  }, [communityId, isMember]);

  const loading = loading1 || loading2 || loading3;
  useLoader(loading);

  return loading;
};

export default useInitIndividualEvent;
