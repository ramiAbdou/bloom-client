import React, { useState } from 'react';

import Show from '@containers/Show';
import { Identifier } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

interface ProfilePictureProps extends BaseProps {
  attendeeId?: Identifier;
  circle?: boolean;
  fontSize?: number;
  guestId?: Identifier;
  memberId?: Identifier;
  size?: number;
}

const ProfilePictureContent: React.FC<ProfilePictureProps> = ({
  attendeeId,
  fontSize,
  guestId,
  memberId,
  size
}) => {
  const [imageError, setImageError] = useState(false);

  // If one of these is null, it means the user isn't fully loaded yet.
  const firstName: string = useStoreState(({ db }) => {
    if (memberId) return db.byMemberId[memberId]?.firstName;
    if (guestId) return db.byGuestId[guestId]?.firstName;
    if (attendeeId) return db.byAttendeeId[attendeeId]?.firstName;
    return db.member?.firstName;
  });

  const lastName: string = useStoreState(({ db }) => {
    if (memberId) return db.byMemberId[memberId]?.lastName;
    if (guestId) return db.byGuestId[guestId]?.lastName;
    if (attendeeId) return db.byAttendeeId[attendeeId]?.lastName;
    return db.member?.lastName;
  });

  const pictureUrl: string = useStoreState(({ db }) => {
    if (attendeeId || guestId) return null;
    if (memberId) return db.byMemberId[memberId]?.pictureUrl;
    return db.member?.pictureUrl;
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
  const { attendeeId, circle = true, className, guestId, size } = props;

  const show: boolean = useStoreState(({ db }) => {
    if (guestId) return !!db.byGuestId[guestId];
    if (attendeeId) return !!db.byAttendeeId[attendeeId];
    return !!db.member?.lastName;
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
