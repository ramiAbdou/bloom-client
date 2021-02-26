import React, { useState } from 'react';

import { BaseProps } from '@util/constants';
import Show from '@containers/Show';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';

interface ProfilePictureProps extends BaseProps {
  attendeeId?: string;
  circle?: boolean;
  guestId?: string;
  fontSize?: number;
  size?: number;
  userId?: string;
}

const ProfilePictureContent: React.FC<ProfilePictureProps> = ({
  attendeeId,
  fontSize,
  guestId,
  size,
  userId
}) => {
  const [imageError, setImageError] = useState(false);

  // If one of these is null, it means the user isn't fully loaded yet.
  const firstName: string = useStoreState(({ db }) => {
    if (userId) return db.byUserId[userId]?.firstName;
    if (guestId) return db.byGuestId[guestId]?.firstName;
    if (attendeeId) return db.byAttendeeId[attendeeId]?.firstName;
    return db.user?.firstName;
  });

  const lastName: string = useStoreState(({ db }) => {
    if (userId) return db.byUserId[userId]?.lastName;
    if (guestId) return db.byGuestId[guestId]?.lastName;
    if (attendeeId) return db.byAttendeeId[attendeeId]?.lastName;
    return db.user?.lastName;
  });

  const pictureUrl: string = useStoreState(({ db }) => {
    if (attendeeId || guestId) return null;
    if (userId) return db.byUserId[userId]?.pictureUrl;
    return db.user?.pictureUrl;
  });

  const initials = firstName[0] + lastName[0];

  if (pictureUrl && !imageError) {
    return (
      <img
        alt="Profile Avatar"
        src={pictureUrl}
        onError={() => setImageError(true)}
      />
    );
  }

  return <h3 style={{ fontSize: fontSize ?? size * 0.4 }}>{initials}</h3>;
};

const ProfilePicture: React.FC<ProfilePictureProps> = (props) => {
  const { attendeeId, circle = true, className, guestId, size, userId } = props;

  const show: boolean = useStoreState(({ db }) => {
    if (userId) return !!db.byUserId[userId];
    if (guestId) return !!db.byGuestId[guestId];
    if (attendeeId) return !!db.byAttendeeId[attendeeId];
    return !!db.user?.lastName;
  });

  const css = cx('m-profile-picture', {
    [className]: className,
    'm-profile-picture--circle': circle
  });

  return (
    <Show show={show}>
      <div
        className={css}
        style={{ height: size, minWidth: size, width: size }}
      >
        <ProfilePictureContent {...props} />
      </div>
    </Show>
  );
};

export default ProfilePicture;
