import useGql from '@gql/useGql';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { uploadImage } from '@util/imageUtil';

const useUpdateEvent = (eventId: string): OnFormSubmitFunction => {
  const gql = useGql();

  const onSubmit = async ({
    closeModal,
    db,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const base64String: string = items.COVER_IMAGE?.value as string;

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

    const { error } = await gql.events.update({
      updatedFields: {
        description: items.EVENT_DESCRIPTION?.value,
        imageUrl,
        privacy: items.PRIVACY?.value,
        summary: items.EVENT_SUMMARY?.value,
        title: items.EVENT_NAME?.value,
        videoUrl: items.VIDEO_URL?.value
      },
      where: { id: eventId }
    });

    if (error) {
      setError('Failed to update event.');
      return;
    }

    showToast({ message: 'Event updated!' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateEvent;
