import day from 'dayjs';

import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import { uploadImage } from '@util/imageUtil';

interface FormatEndTimeArgs {
  endDate: string;
  endTime: string;
}

const formatEndTime = ({ endDate, endTime }: FormatEndTimeArgs) => {
  const endDateOnly: string = day(endDate)?.format('MMM D, YYYY');
  const endTimeOnly: string = day(endTime)?.format('h:mm A');

  const formattedStartTime: string = day
    .utc(`${endDateOnly} @ ${endTimeOnly}`, 'MMMM D, YYYY @ h:mm A')
    .format();

  return formattedStartTime;
};

interface FormatStartTimeArgs {
  startDate: string;
  startTime: string;
}

const formatStartTime = ({ startDate, startTime }: FormatStartTimeArgs) => {
  const startDateOnly: string = day(startDate)?.format('MMM D, YYYY');
  const startTimeOnly: string = day(startTime)?.format('h:mm A');

  const formattedStartTime: string = day
    .utc(`${startDateOnly} @ ${startTimeOnly}`, 'MMMM D, YYYY @ h:mm A')
    .format();

  return formattedStartTime;
};

const useCreateEvent = (): OnFormSubmitFunction => {
  const onSubmit = async ({
    closeModal,
    gql,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const description: string = items.EVENT_DESCRIPTION?.value as string;
    const privacy: EventPrivacy = items.PRIVACY?.value as EventPrivacy;
    const summary: string = items.EVENT_SUMMARY?.value as string;
    const title: string = items.EVENT_NAME?.value as string;
    const videoUrl: string = items.VIDEO_URL?.value as string;

    const endTime: string = formatEndTime({
      endDate: items.END_DATE?.value as string,
      endTime: items.END_TIME?.value as string
    });

    const startTime: string = formatStartTime({
      startDate: items.START_DATE?.value as string,
      startTime: items.START_TIME?.value as string
    });

    const base64String: string = items.COVER_IMAGE?.value as string;

    let imageUrl: string;

    if (base64String) {
      try {
        imageUrl = await uploadImage({ base64String, key: 'EVENT' });
      } catch {
        setError('Failed to upload event cover photo.');
        return;
      }
    }

    // const eventInvitees: string[] =
    //   items.EVENT_NOTIFICATION?.value === `Don't Send Email`
    //     ? []
    //     : (await gql.members.find({
    //         fields: ['id'],
    //         where: { community: { id: communityId } }
    //       })).data;

    // const args = {
    //   description: items.EVENT_DESCRIPTION?.value as string,
    //   endTime,
    //   eventInvitees: [],
    //   // eventInvitees,
    //   imageUrl,
    //   privacy: items.PRIVACY?.value as any,
    //   startTime,
    //   summary: items.EVENT_SUMMARY?.value as string,
    //   title: items.EVENT_NAME?.value as string,
    //   videoUrl: items.VIDEO_URL?.value as string
    // };

    const { error } = await gql.create(IEvent, {
      data: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore b/c
        communityId: db.communityId,
        description,
        endTime,
        imageUrl,
        privacy,
        startTime,
        summary,
        title,
        videoUrl
      },
      fields: [
        'description',
        'endTime',
        'imageUrl',
        'privacy',
        'startTime',
        'summary',
        'title',
        'videoUrl'
      ]
    });

    if (error) {
      setError('Failed to create event. Please try again later.');
      return;
    }

    closeModal();
    showToast({ message: 'Event created.' });
  };

  return onSubmit;
};

export default useCreateEvent;
