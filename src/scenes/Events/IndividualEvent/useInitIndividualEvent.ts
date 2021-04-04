import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { SetActiveArgs } from '@store/Db/Db.types';
import { IEvent } from '@store/Db/Db.entities';
import { Schema } from '@store/Db/Db.schema';
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
        { id: result.data[0].communityId, table: 'communities' }
      ]);
    }
  }, [result.data]);

  return result;
};

export default useInitIndividualEvent;
