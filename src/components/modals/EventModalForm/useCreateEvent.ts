import day from 'dayjs';
import { nanoid } from 'nanoid';
import { showToast } from 'src/App.reactive';

import {
  ApolloCache,
  DocumentNode,
  gql,
  Reference,
  useMutation
} from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { modalVar } from '@core/state/Modal.reactive';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import { uploadImage } from '@util/imageUtil';
import { now } from '@util/util';

interface CreateEventArgs {
  createdAt: string;
  description: string;
  endTime: string;
  id: string;
  imageUrl: string;
  privacy: string;
  summary: string;
  startTime: string;
  title: string;
  videoUrl: string;
  updatedAt: string;
}

interface CreateEventResult {
  createEvent: IEvent;
}

const CREATE_EVENT: DocumentNode = gql`
  mutation CreateEvent(
    $communityId: String!
    $createdAt: String!
    $description: String!
    $endTime: String!
    $id: String!
    $imageUrl: String
    $privacy: String!
    $startTime: String!
    $summary: String
    $title: String!
    $videoUrl: String!
    $updatedAt: String!
  ) {
    communityId @client @export(as: "communityId")

    createEvent(
      object: {
        communityId: $communityId
        createdAt: $createdAt
        description: $description
        endTime: $endTime
        id: $id
        imageUrl: $imageUrl
        privacy: $privacy
        summary: $summary
        startTime: $startTime
        title: $title
        videoUrl: $videoUrl
        updatedAt: $updatedAt
      }
    ) {
      description
      endTime
      id
      imageUrl
      privacy
      summary
      startTime
      title
      videoUrl
    }
  }
`;

interface FormatEndTimeArgs {
  endDate: string;
  endTime: string;
}

const formatEndTime = ({ endDate, endTime }: FormatEndTimeArgs) => {
  const endDateOnly: string = day(endDate)?.format('MMM D, YYYY');
  const endTimeOnly: string = day(endTime)?.format('h:mm A');

  const formattedStartTime: string = day
    .utc(`${endDateOnly} @ ${endTimeOnly}`, 'MMMM D, YYYY @ h:mm A')
    .format();

  return formattedStartTime;
};

interface FormatStartTimeArgs {
  startDate: string;
  startTime: string;
}

const formatStartTime = ({ startDate, startTime }: FormatStartTimeArgs) => {
  const startDateOnly: string = day(startDate)?.format('MMM D, YYYY');
  const startTimeOnly: string = day(startTime)?.format('h:mm A');

  const formattedStartTime: string = day
    .utc(`${startDateOnly} @ ${startTimeOnly}`, 'MMMM D, YYYY @ h:mm A')
    .format();

  return formattedStartTime;
};

const useCreateEvent = (): OnFormSubmitFunction => {
  const [createEvent] = useMutation<CreateEventResult, CreateEventArgs>(
    CREATE_EVENT,
    {
      update: (cache: ApolloCache<CreateEventResult>, { data }) => {
        const event: IEvent = data?.createEvent;

        cache.modify({
          fields: {
            events: (existingEventRefs: Reference[] = []) => {
              const newEventRef: Reference = cache.writeFragment({
                data: event,
                fragment: gql`
                  fragment NewEvent on events {
                    id
                    title
                  }
                `
              });

              return [...existingEventRefs, newEventRef];
            }
          }
        });
      }
    }
  );

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    const description: string = items.EVENT_DESCRIPTION?.value as string;
    const privacy: EventPrivacy = items.PRIVACY?.value as EventPrivacy;
    const summary: string = items.EVENT_SUMMARY?.value as string;
    const title: string = items.EVENT_NAME?.value as string;
    const videoUrl: string = items.VIDEO_URL?.value as string;

    const endTime: string = formatEndTime({
      endDate: items.END_DATE?.value as string,
      endTime: items.END_TIME?.value as string
    });

    const startTime: string = formatStartTime({
      startDate: items.START_DATE?.value as string,
      startTime: items.START_TIME?.value as string
    });

    const base64String: string = items.COVER_IMAGE?.value as string;

    let imageUrl: string;

    if (base64String) {
      try {
        imageUrl = await uploadImage({ base64String, key: 'EVENT' });
      } catch {
        setError('Failed to upload event cover photo.');
        return;
      }
    }

    try {
      await createEvent({
        variables: {
          createdAt: now(),
          description,
          endTime,
          id: nanoid(),
          imageUrl,
          privacy,
          startTime,
          summary,
          title,
          updatedAt: now(),
          videoUrl
        }
      });

      modalVar(null);
      showToast({ message: 'Event created.' });
    } catch {
      setError('Failed to create event. Please try again later.');
    }
  };

  return onSubmit;
};

export default useCreateEvent;
