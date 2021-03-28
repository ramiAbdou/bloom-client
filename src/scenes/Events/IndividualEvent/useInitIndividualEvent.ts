import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import useLoader from '@organisms/Loader/useLoader';
import { EventPrivacy, ICommunity, IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { ErrorContext } from '@util/constants.errors';
import { QueryEvent } from '@util/constants.events';
import { GetEventArgs } from '../Events.types';

const useInitIndividualEvent = (): Partial<QueryResult> => {
  const { eventId } = useParams() as { eventId: string };

  const communityId: string = useStoreState(({ db }) => {
    return db.community?.id;
  });

  const isMember: boolean = useStoreState(({ db }) => {
    return db.isMember;
  });

  const isMembersOnly: boolean = useStoreState(({ db }) => {
    return db.event?.privacy === EventPrivacy.MEMBERS_ONLY;
  });

  const setActive = useStoreActions(({ db }) => {
    return db.setActive;
  });

  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const { data: data1, loading: loading1 } = useQuery<any, GetEventArgs>({
    fields: [
      'description',
      'endTime',
      'eventUrl',
      'id',
      'imageUrl',
      'privacy',
      'recordingUrl',
      'startTime',
      'summary',
      'title',
      'videoUrl',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_EVENT,
    schema: Schema.EVENT,
    types: { eventId: { required: true } },
    variables: { eventId }
  });

  const { loading: loading2 } = useQuery<IEvent, GetEventArgs>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.GET_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST],
    types: { eventId: { required: false } },
    variables: { eventId }
  });

  const [getCommunity, { loading: loading3 }] = useManualQuery<ICommunity>({
    fields: ['id', 'name', 'primaryColor'],
    operation: QueryEvent.GET_COMMUNITY,
    schema: Schema.COMMUNITY,
    types: { communityId: { required: false } }
  });

  const hasCookieError = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  useEffect(() => {
    if (data1) {
      setActive([
        { id: data1.id, table: 'events' },
        { id: data1.community.id, table: 'communities' }
      ]);
    }
  }, [data1]);

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

  // If not a member of the community, then we need to load the
  // community's name and primary color as well.
  useEffect(() => {
    (async () => {
      if (communityId && !isMember) await getCommunity({ communityId });
    })();
  }, [communityId, isMember]);

  useLoader(loading1 || loading2 || loading3);

  return { loading: loading1 || loading2 || loading3 };
};

export default useInitIndividualEvent;
