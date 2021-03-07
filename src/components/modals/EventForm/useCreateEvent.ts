import day from 'dayjs';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import { uploadImage } from '@util/imageUtil';

type CreateEventArgs = Omit<Partial<IEvent>, 'eventUrl' | 'guests' | 'id'>;

const useCreateEvent = (): OnFormSubmit => {
  const [createEvent] = useMutation<IEvent, CreateEventArgs>({
    fields: [
      'description',
      'endTime',
      'eventUrl',
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
    const endDateOnly = day(items.END_DATE?.value)?.format('MMM D, YYYY');
    const endTimeOnly = day(items.END_TIME?.value)?.format('h:mm A');
    const startDateOnly = day(items.START_DATE?.value)?.format('MMM D, YYYY');
    const startTimeOnly = day(items.START_TIME?.value)?.format('h:mm A');

    const endTime = day(
      `${endDateOnly} @ ${endTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const startTime = day(
      `${startDateOnly} @ ${startTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const base64String = items.COVER_IMAGE?.value;
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
      description: items.EVENT_DESCRIPTION?.value,
      endTime,
      imageUrl,
      invitees,
      privacy: items.PRIVACY?.value,
      startTime,
      summary: items.EVENT_SUMMARY?.value,
      title: items.EVENT_NAME?.value,
      videoUrl: items.VIDEO_URL?.value
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