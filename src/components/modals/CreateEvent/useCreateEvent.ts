import day from 'dayjs';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { uploadImage } from '@util/imageUtil';

const useCreateEvent = (): OnFormSubmit => {
  const [createEvent] = useMutation<
    IEvent,
    Omit<Partial<IEvent>, 'eventUrl' | 'guests' | 'id'>
  >({
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
    operation: 'createEvent',
    schema: Schema.EVENT,
    types: {
      description: { required: true },
      endTime: { required: true },
      imageUrl: { required: false },
      private: { required: false, type: 'Boolean' },
      startTime: { required: true },
      summary: { required: false },
      title: { required: true },
      videoUrl: { required: true }
    }
  });

  const onSubmit = async ({
    closeModal,
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

    const args: Omit<Partial<IEvent>, 'eventUrl' | 'guests' | 'id'> = {
      description: items.EVENT_DESCRIPTION?.value,
      endTime,
      imageUrl,
      private: items.PRIVACY_SETTINGS?.value === 'Members Only',
      startTime,
      summary: items.EVENT_SUMMARY?.value,
      title: items.EVENT_NAME?.value,
      videoUrl: items.VIDEO_URL?.value
    };

    await createEvent(args);

    showToast({ message: 'Event created!' });
    closeModal();
  };

  return onSubmit;
};

export default useCreateEvent;
