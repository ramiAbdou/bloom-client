import day from 'dayjs';

import { IEvent } from '@db/db.entities';
import { Schema } from '@db/db.schema';
import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { MutationEvent } from '@util/constants.events';
import { uploadImage } from '@util/imageUtil';

type CreateEventArgs = Omit<Partial<IEvent>, 'eventUrl' | 'guests' | 'id'>;

const useCreateEvent = (): OnFormSubmitFunction => {
  const [createEvent] = useBloomMutation<IEvent, CreateEventArgs>({
    fields: [
      'description',
      'endTime',
      'id',
      'imageUrl',
      'privacy',
      'startTime',
      'summary',
      'title',
      'videoUrl',
      { community: ['id'] }
    ],
    operation: MutationEvent.CREATE_EVENT,
    schema: Schema.EVENT,
    types: {
      description: { required: true },
      endTime: { required: true },
      imageUrl: { required: false },
      invitees: { required: true, type: '[String!]' },
      privacy: { required: false },
      startTime: { required: true },
      summary: { required: false },
      title: { required: true },
      videoUrl: { required: true }
    }
  });

  const onSubmit = async ({
    closeModal,
    db,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const endDateOnly: string = day(items.END_DATE?.value as string)?.format(
      'MMM D, YYYY'
    );

    const endTimeOnly: string = day(items.END_TIME?.value as string)?.format(
      'h:mm A'
    );

    const startDateOnly: string = day(
      items.START_DATE?.value as string
    )?.format('MMM D, YYYY');

    const startTimeOnly: string = day(
      items.START_TIME?.value as string
    )?.format('h:mm A');

    const endTime: string = day(
      `${endDateOnly} @ ${endTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const startTime: string = day(
      `${startDateOnly} @ ${startTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const base64String: string = items.COVER_IMAGE?.value as string;

    let imageUrl: string;

    if (base64String) {
      try {
        imageUrl = await uploadImage({ base64String, key: 'EVENT' });
      } catch {
        setError('Failed to upload image.');
        return;
      }
    }

    const invitees: string[] =
      items.EVENT_NOTIFICATION?.value === `Don't Send Email`
        ? []
        : db.community.members;

    const args: CreateEventArgs = {
      description: items.EVENT_DESCRIPTION?.value as string,
      endTime,
      imageUrl,
      invitees,
      privacy: items.PRIVACY?.value as any,
      startTime,
      summary: items.EVENT_SUMMARY?.value as string,
      title: items.EVENT_NAME?.value as string,
      videoUrl: items.VIDEO_URL?.value as string
    };

    const { error } = await createEvent(args);

    if (error) {
      setError(error);
      return;
    }

    showToast({ message: 'Event created!' });
    closeModal();
  };

  return onSubmit;
};

export default useCreateEvent;
