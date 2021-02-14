import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CookieType, ModalType } from '@constants';
import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import { ICommunity, IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { eventFields, GetEventArgs } from '../Events.types';

const useInitIndividualEvent = (): boolean => {
  const { eventId } = useParams() as { eventId: string };

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

  const [getCommunityOwner, { loading: loading3 }] = useManualQuery<ICommunity>(
    {
      fields: [
        'id',
        'name',
        'primaryColor',
        { owner: ['id', { user: ['id', 'email', 'firstName', 'lastName'] }] }
      ],
      operation: 'getCommunityOwner',
      schema: [Schema.COMMUNITY]
    }
  );

  const hasCookieError = !!Cookies.get(CookieType.LOGIN_ERROR);

  useEffect(() => {
    if (data1) {
      setActive({ id: data1.id, table: 'events' });
      // @ts-ignore b/c type issues.
      setActive({ id: data1.community?.id, table: 'communities' });
    }
  }, [data1]);

  useEffect(() => {
    (async () => {
      if (isMember) await getCommunityOwner();
    })();

    if (!isMember && (isMembersOnly || hasCookieError)) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
    }
  }, [hasCookieError, isMember, isMembersOnly]);

  return loading1 || loading2 || loading3;
};

export default useInitIndividualEvent;
