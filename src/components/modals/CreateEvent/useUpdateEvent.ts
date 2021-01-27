import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { uploadImage } from '@util/imageUtil';
import { UPDATE_EVENT } from './CreateEvent.gql';

const useUpdateEvent = (eventId: string): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateEvent] = useMutation<IEvent, Partial<IEvent>>({
    name: 'updateEvent',
    query: UPDATE_EVENT,
    schema: Schema.EVENT
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const base64String = items.find(({ type }) => type === 'COVER_IMAGE')
      ?.value;

    let imageUrl: string;

    if (base64String) {
      try {
        imageUrl = await uploadImage({ base64String, key: 'EVENT' });
      } catch {
        setErrorMessage('Failed to upload image.');
        return;
      }
    }

    const args: Partial<IEvent> = {
      description: items.find(({ id }) => id === 'EVENT_DESCRIPTION')?.value,
      id: eventId,
      imageUrl,
      private:
        items.find(({ id }) => id === 'PRIVACY_SETTINGS')?.value ===
        'Members Only',
      summary: items.find(({ id }) => id === 'EVENT_SUMMARY')?.value,
      title: items.find(({ id }) => id === 'EVENT_NAME')?.value,
      videoUrl: items.find(({ id }) => id === 'VIDEO_URL')?.value
    };

    await updateEvent(args);
    showToast({ message: 'Event updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateEvent;
