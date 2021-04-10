import { EventPrivacy, IEvent } from '@core/db/db.entities';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { uploadImage } from '@util/imageUtil';

const useUpdateEvent = (eventId: string): OnFormSubmitFunction => {
  const onSubmit = async ({
    closeModal,
    db,
    gql,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const base64String: string = items.COVER_IMAGE?.value as string;

    let imageUrl: string;

    const event: IEvent = await gql.findOne(IEvent, {
      fields: ['imageUrl'],
      where: { id: db.eventId }
    });

    if (base64String) {
      try {
        imageUrl = await uploadImage({
          base64String,
          key: 'EVENT',
          previousImageUrl: event?.imageUrl
        });
      } catch {
        setError('Failed to upload image.');
        return;
      }
    }

    const { error } = await gql.update(IEvent, {
      data: {
        description: items.EVENT_DESCRIPTION?.value as string,
        imageUrl,
        privacy: items.PRIVACY?.value as EventPrivacy,
        summary: items.EVENT_SUMMARY?.value as string,
        title: items.EVENT_NAME?.value as string,
        videoUrl: items.VIDEO_URL?.value as string
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
