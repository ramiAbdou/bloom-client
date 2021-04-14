import day from 'dayjs';

import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { IEvent } from '@core/db/db.entities';
import { uploadImage } from '@util/imageUtil';

const formatEndTime = ({ endDate, endTime }) => {
  const endDateOnly: string = day(endDate)?.format('MMM D, YYYY');
  const endTimeOnly: string = day(endTime)?.format('h:mm A');

  const formattedStartTime: string = day
    .utc(`${endDateOnly} @ ${endTimeOnly}`, 'MMMM D, YYYY @ h:mm A')
    .format();

  return formattedStartTime;
};

const formatStartTime = ({ startDate, startTime }) => {
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
    db,
    gql,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
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
        description: items.EVENT_DESCRIPTION?.value as string,
        endTime,
        // eventInvitees: [],
        // eventInvitees,
        imageUrl,
        privacy: items.PRIVACY?.value as any,
        startTime,
        summary: items.EVENT_SUMMARY?.value as string,
        title: items.EVENT_NAME?.value as string,
        videoUrl: items.VIDEO_URL?.value as string
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

    // const { error } = await createEvent(args);

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
