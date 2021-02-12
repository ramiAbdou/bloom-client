import React, { useState } from 'react';

import { ClassNameProps } from '@constants';
import { useStoreState } from '@store/Store';
import { cx, takeFirst } from '@util/util';

interface ProfilePictureProps extends ClassNameProps {
  circle?: boolean;
  fontSize?: number;
  size?: number;
  userId?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  circle = true,
  className,
  fontSize,
  size,
  userId
}) => {
  const [imageError, setImageError] = useState(false);

  // If one of these is null, it means the user isn't fully loaded yet.
  const firstName: string = useStoreState(({ db }) => {
    if (userId) return db.byUserId[userId]?.firstName;
    return db.user?.firstName;
  });

  const lastName: string = useStoreState(({ db }) => {
    if (userId) return db.byUserId[userId]?.lastName;
    return db.user?.lastName;
  });

  const pictureUrl: string = useStoreState(({ db }) => {
    if (userId) return db.byUserId[userId]?.pictureUrl;
    return db.user?.pictureUrl;
  });

  if (!firstName || !lastName) return null;

  const initials = firstName[0] + lastName[0];

  const body = takeFirst([
    [
      pictureUrl && !imageError,
      <img
        alt="Profile Avatar"
        src={pictureUrl}
        onError={() => setImageError(true)}
      />
    ],
    <h3 style={{ fontSize: fontSize ?? size * 0.4 }}>{initials}</h3>
  ]);

  const css = cx('m-profile-picture', {
    [className]: className,
    'm-profile-picture--circle': circle
  });

  return (
    <div className={css} style={{ height: size, minWidth: size, width: size }}>
      {body}
    </div>
  );
};

export default ProfilePicture;
