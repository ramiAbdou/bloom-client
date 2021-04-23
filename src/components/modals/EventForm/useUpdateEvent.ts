import { showToast } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { modalVar } from '@core/state/Modal.reactive';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import { uploadImage } from '@util/imageUtil';

const useUpdateEvent = (): OnFormSubmitFunction => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const onSubmit = async ({ gql, items, setError }: OnFormSubmitArgs) => {
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

    modalVar(null);
    showToast({ message: 'Event updated.' });
  };

  return onSubmit;
};

export default useUpdateEvent;
