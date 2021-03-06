import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { uploadImage } from '@util/imageUtil';

const useUpdateEvent = (eventId: string): OnFormSubmit => {
  const [updateEvent] = useMutation<IEvent>({
    fields: [
      'description',
      'id',
      'imageUrl',
      'privacy',
      'summary',
      'title',
      'videoUrl'
    ],
    operation: 'updateEvent',
    schema: Schema.EVENT,
    types: {
      description: { required: false },
      eventId: { required: true },
      imageUrl: { required: false },
      privacy: { required: false },
      summary: { required: false },
      title: { required: false },
      videoUrl: { required: false }
    }
  });

  const onSubmit = async ({
    closeModal,
    db,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const base64String = items.COVER_IMAGE?.value;

    let imageUrl: string;

    if (base64String) {
      try {
        imageUrl = await uploadImage({
          base64String,
          key: 'EVENT',
          previousImageUrl: db.event?.imageUrl
        });
      } catch {
        setError('Failed to upload image.');
        return;
      }
    }

    const args = {
      description: items.EVENT_DESCRIPTION?.value,
      eventId,
      imageUrl,
      privacy: items.PRIVACY?.value,
      summary: items.EVENT_SUMMARY?.value,
      title: items.EVENT_NAME?.value,
      videoUrl: items.VIDEO_URL?.value
    };

    await updateEvent(args);

    showToast({ message: 'Event updated!' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateEvent;
