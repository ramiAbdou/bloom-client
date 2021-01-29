import React, { useState } from 'react';

import { ClassNameProps } from '@constants';
import { useStoreState } from '@store/Store';
import { cx, takeFirst } from '@util/util';

interface ProfilePictureProps extends ClassNameProps {
  circle?: boolean;
  firstName?: string;
  fontSize?: number;
  lastName?: string;
  href?: string;
  size?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  circle,
  className,
  firstName: fName,
  fontSize,
  href,
  lastName: lName,
  size
}) => {
  const [imageError, setImageError] = useState(false);

  // If one of these is null, it means the user isn't fully loaded yet.
  const firstName = useStoreState(({ db }) => fName ?? db.user?.firstName);
  const lastName = useStoreState(({ db }) => lName ?? db.user?.lastName);

  if (!firstName || !lastName) return null;

  const initials = firstName[0] + lastName[0];

  const body = takeFirst([
    [
      href && !imageError,
      <img
        alt="Profile Avatar"
        src={href}
        onError={() => setImageError(true)}
      />
    ],
    <h3 style={{ fontSize }}>{initials}</h3>
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