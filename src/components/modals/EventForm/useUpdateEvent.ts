import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { EventPrivacy, IEvent } from '@util/db.entities';
import { useStoreState } from '@core/store/Store';
import { uploadImage } from '@util/imageUtil';

const useUpdateEvent = (): OnFormSubmitFunction => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const onSubmit = async ({
    closeModal,
    gql,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const base64String: string = items.COVER_IMAGE?.value as string;
    const description: string = items.EVENT_DESCRIPTION?.value as string;
    const privacy: EventPrivacy = items.PRIVACY?.value as EventPrivacy;
    const summary: string = items.EVENT_SUMMARY?.value as string;
    const title: string = items.EVENT_NAME?.value as string;
    const videoUrl: string = items.VIDEO_URL?.value as string;

    const event: IEvent = await gql.findOne(IEvent, {
      fields: ['imageUrl'],
      where: { id: '' }
    });

    let imageUrl: string;

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
      data: { description, imageUrl, privacy, summary, title, videoUrl },
      where: { id: eventId }
    });

    if (error) {
      setError('Failed to update event.');
      return;
    }

    showToast({ message: 'Event updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateEvent;
