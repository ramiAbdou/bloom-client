import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IEvent, Schema } from '@db/db.entities';
import { SetActiveArgs } from '@db/db.types';
import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { useStoreActions } from '@store/Store';

const useInitIndividualEvent = (): QueryResult<IEvent[]> => {
  const { eventId } = useParams() as { eventId: string };

  const setActiveEntities: ActionCreator<
    SetActiveArgs | SetActiveArgs[]
  > = useStoreActions(({ db }) => db.setActiveEntities);

  const result = useQuery<IEvent[]>({
    fields: [
      'communityId',
      'community.id',
      'community.name',
      'community.primaryColor',
      'description',
      'endTime',
      'eventGuests.createdAt',
      'eventGuests.member.email',
      'eventGuests.member.firstName',
      'eventGuests.member.id',
      'eventGuests.member.lastName',
      'eventGuests.member.pictureUrl',
      'eventGuests.supporter.email',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.id',
      'eventGuests.supporter.lastName',
      'id',
      'imageUrl',
      'privacy',
      'recordingUrl',
      'startTime',
      'summary',
      'title',
      'videoUrl'
    ],
    operation: 'events',
    schema: [Schema.EVENT],
    where: { id: eventId }
  });

  useEffect(() => {
    if (result.data) {
      setActiveEntities([
        { id: result.data[0].id, table: 'events' },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore b/c we know that the denormalized data is nested.
        { id: result.data[0].community.id, table: 'communities' }
      ]);
    }
  }, [result.data]);

  return result;
};

export default useInitIndividualEvent;
