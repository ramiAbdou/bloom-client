import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember
} from '@util/constants.entities';
import { sortObjects } from '@util/util';
import ProfileModalHistoryEvent, {
  ProfileModalHistoryEventData
} from './ProfileModalHistoryEvent';

const ProfileModalHistoryEventList: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const attendeeEvents: ProfileModalHistoryEventData[] = member.eventWatches.map(
    (eventAttendee: IEventAttendee) => {
      return {
        date: eventAttendee.createdAt,
        event: `Attended Event`,
        title: eventAttendee.event.title
      };
    }
  );

  const guestEvents: ProfileModalHistoryEventData[] = member.eventGuests.map(
    (eventGuest: IEventGuest) => {
      return {
        date: eventGuest.createdAt,
        event: `RSVP'd to Event`,
        title: eventGuest.event.title
      };
    }
  );

  const joinedAtEvents: ProfileModalHistoryEventData[] = [
    {
      date: member.joinedAt,
      event: 'Joined Community',
      title: member.community.name
    }
  ];

  const watchEvents: ProfileModalHistoryEventData[] = member.eventWatches.map(
    (eventWatch: IEventWatch) => {
      return {
        date: eventWatch.createdAt,
        event: `Viewed Event Recording`,
        title: eventWatch.event.title
      };
    }
  );

  const historyEventList: ProfileModalHistoryEventData[] = [
    ...attendeeEvents,
    ...guestEvents,
    ...joinedAtEvents,
    ...watchEvents
  ].sort((a: ProfileModalHistoryEventData, b: ProfileModalHistoryEventData) =>
    sortObjects(a, b, 'date')
  );

  return (
    <ul>
      {historyEventList.map((historyEvent: ProfileModalHistoryEventData) => (
        <ProfileModalHistoryEvent key={historyEvent?.date} {...historyEvent} />
      ))}
    </ul>
  );
};

ProfileModalHistoryEventList.fragments = {
  data: gql`
    fragment ProfileModalHistoryEventListFragment on members {
      joinedAt
      role

      community {
        name
      }

      eventAttendees {
        createdAt
        event {
          title
        }
      }

      eventGuests {
        createdAt
        event {
          title
        }
      }

      eventWatches {
        createdAt
        event {
          title
        }
      }
    }
  `
};

export default ProfileModalHistoryEventList;
