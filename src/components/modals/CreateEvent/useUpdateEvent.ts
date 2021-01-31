import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { uploadImage } from '@util/imageUtil';
import { UPDATE_EVENT } from './CreateEvent.gql';

const useUpdateEvent = (eventId: string): OnFormSubmit => {
  const [updateEvent] = useMutation<IEvent, Partial<IEvent>>({
    name: 'updateEvent',
    query: UPDATE_EVENT,
    schema: Schema.EVENT
  });

  const onSubmit = async ({ actions, items, setError }: OnFormSubmitArgs) => {
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

    const args: Partial<IEvent> = {
      description: items.EVENT_DESCRIPTION?.value,
      id: eventId,
      imageUrl,
      private: items.PRIVACY_SETTINGS?.value === 'Members Only',
      summary: items.EVENT_SUMMARY?.value,
      title: items.EVENT_NAME?.value,
      videoUrl: items.VIDEO_URL?.value
    };

    await updateEvent(args);

    actions.toast.showToast({ message: 'Event updated!' });
    actions.modal.closeModal();
  };

  return onSubmit;
};

export default useUpdateEvent;
