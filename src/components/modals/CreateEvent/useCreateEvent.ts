import day from 'dayjs';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { uploadImage } from '@util/imageUtil';
import { CREATE_EVENT } from './CreateEvent.gql';

const useCreateEvent = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [createEvent] = useMutation<
    IEvent,
    Omit<Partial<IEvent>, 'eventUrl' | 'guests' | 'id'>
  >({
    name: 'createEvent',
    query: CREATE_EVENT,
    schema: Schema.EVENT
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const endDateOnly = day(items.END_DATE?.value)?.format('MMMM D, YYYY');
    const endTimeOnly = day(items.END_TIME?.value)?.format('h:mm A');
    const startDateOnly = day(items.START_DATE?.value)?.format('MMMM D, YYYY');
    const startTimeOnly = day(items.START_TIME?.value)?.format('h:mm A');

    const endTime = day(
      `${endDateOnly} @ ${endTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const startTime = day(
      `${startDateOnly} @ ${startTimeOnly}`,
      'MMMM D, YYYY @ h:mm A'
    ).format();

    const coverImage = items.COVER_IMAGE?.value;

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
