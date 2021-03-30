import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { SetActiveArgs } from '@store/Db/Db.types';
import { ICommunity, IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';
import { GetEventArgs } from '../Events.types';

interface GetEventResult {
  id: string;
  community: { id: string };
}

const useInitIndividualEvent = (): Partial<QueryResult> => {
  const { eventId } = useParams() as { eventId: string };
  const communityId: string = useStoreState(({ db }) => db.community?.id);
  const isMember: boolean = useStoreState(({ db }) => db.isMember);

  const setActiveEntities: ActionCreator<
    SetActiveArgs | SetActiveArgs[]
  > = useStoreActions(({ db }) => db.setActiveEntities);

  const { data: data1, loading: loading1 } = useQuery<
    GetEventResult,
    GetEventArgs
  >({
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

  const { loading: loading2 } = useQuery<IEventGuest[], GetEventArgs>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.LIST_EVENT_GUESTS,
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

  useEffect(() => {
    if (data1) {
      setActiveEntities([
        { id: data1.id, table: 'events' },
        { id: data1.community.id, table: 'communities' }
      ]);
    }
  }, [data1]);

  // If not a member of the community, then we need to load the
  // community's name and primary color as well.
  useEffect(() => {
    (async () => {
      if (communityId && !isMember) await getCommunity({ communityId });
    })();
  }, [communityId, isMember]);

  return { loading: loading1 || loading2 || loading3 };
};

export default useInitIndividualEvent;
