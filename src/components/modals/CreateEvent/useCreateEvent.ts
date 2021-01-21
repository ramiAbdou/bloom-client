import day from 'dayjs';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { uploadImage } from '@util/imageUtil';
import { CREATE_EVENT } from './CreateEvent.gql';

const useCreateEvent = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [createEvent] = useMutation<
    IEvent,
    Omit<IEvent, 'eventUrl' | 'guests' | 'id'>
  >({
    name: 'createEvent',
    query: CREATE_EVENT,
    schema: Schema.EVENT
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const endDateOnly = items.find(({ title }) => title === 'End Time')?.value;
    const endTimeOnly = items.find(({ id }) => id === 'END_TIME')?.value;

    const startDateOnly = items.find(({ title }) => title === 'Start Time')
      ?.value;

    const startTimeOnly = items.find(({ id }) => id === 'START_TIME')?.value;

    const endTime = day(
      `${endDateOnly} @ ${endTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const startTime = day(
      `${startDateOnly} @ ${startTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const coverImage = items.find(({ type }) => type === 'COVER_IMAGE')?.value;

    let imageUrl: string;

    if (coverImage) {
      try {
        imageUrl = await uploadImage({
          base64String: coverImage,
          key: 'EVENT'
        });
      } catch {
        setErrorMessage('Failed to upload image.');
        return;
      }
    }

    const args: Omit<IEvent, 'eventUrl' | 'guests' | 'id'> = {
      description: items.find(({ id }) => id === 'EVENT_DESCRIPTION')?.value,
      endTime,
      imageUrl,
      private:
        items.find(({ id }) => id === 'PRIVACY_SETTINGS')?.value ===
        'Private Event',
      startTime,
      title: items.find(({ id }) => id === 'EVENT_NAME')?.value,
      videoUrl: items.find(({ id }) => id === 'VIDEO_URL')?.value
    };

    await createEvent(args);
    showToast({ message: 'Event created!' });
    closeModal();
  };

  return onSubmit;
};

export default useCreateEvent;
