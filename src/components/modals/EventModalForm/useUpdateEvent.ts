import { showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation, useReactiveVar } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { modalVar } from '@core/state/Modal.state';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import { uploadImage } from '@util/imageUtil';

interface UpdateEventArgs {
  description: string;
  eventId: string;
  imageUrl: string;
  privacy: string;
  summary: string;
  title: string;
  videoUrl: string;
}

const UPDATE_EVENT: DocumentNode = gql`
  mutation UpdateEvent(
    $description: String
    $eventId: String!
    $imageUrl: String
    $privacy: String
    $summary: String
    $title: String
    $videoUrl: String
  ) {
    eventId @client @export(as: "eventId")

    updateEvent(
      pk_columns: { id: $eventId }
      _set: {
        description: $description
        imageUrl: $imageUrl
        privacy: $privacy
        summary: $summary
        title: $title
        videoUrl: $videoUrl
      }
    ) {
      description
      id
      imageUrl
      privacy
      summary
      title
      videoUrl
    }
  }
`;

const useUpdateEvent = (): OnFormSubmitFunction => {
  const [updateEvent] = useMutation<IEvent, UpdateEventArgs>(UPDATE_EVENT);
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const onSubmit = async ({ items, formDispatch }: OnFormSubmitArgs) => {
    const base64String: string = items.COVER_IMAGE?.value as string;
    const description: string = items.EVENT_DESCRIPTION?.value as string;
    const privacy: EventPrivacy = items.PRIVACY?.value as EventPrivacy;
    const summary: string = items.EVENT_SUMMARY?.value as string;
    const title: string = items.EVENT_NAME?.value as string;
    const videoUrl: string = items.VIDEO_URL?.value as string;

    let imageUrl: string;

    if (base64String) {
      try {
        imageUrl = await uploadImage({ base64String, key: 'EVENT' });
      } catch {
        formDispatch({ error: 'Failed to upload image.', type: 'SET_ERROR' });
        return;
      }
    }

    try {
      await updateEvent({
        variables: {
          description,
          eventId,
          imageUrl,
          privacy,
          summary,
          title,
          videoUrl
        }
      });

      modalVar(null);
      showToast({ message: 'Event updated.' });
    } catch {
      formDispatch({ error: 'Failed to update event.', type: 'SET_ERROR' });
    }
  };

  return onSubmit;
};

export default useUpdateEvent;
