import React from 'react';

import { ClassNameProps } from '@constants';
import { useStoreState } from '@store/Store';
import { makeClass, takeFirst } from '@util/util';

interface ProfilePictureProps extends ClassNameProps {
  circle?: boolean;
  firstName?: string;
  fontSize?: number;
  lastName?: string;
  pictureUrl?: string;
  size?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  circle,
  className,
  firstName: fName,
  fontSize,
  lastName: lName,
  pictureUrl: pUrl,
  size
}) => {
  // If one of these is null, it means the user isn't fully loaded yet.

  const firstName = useStoreState(({ db }) => fName ?? db.user?.firstName);
  const lastName = useStoreState(({ db }) => lName ?? db.user?.lastName);
  const pictureUrl = useStoreState(({ db }) => pUrl ?? db.user?.pictureUrl);

  if (!firstName || !lastName) return null;

  const initials = firstName[0] + lastName[0];

  const body = takeFirst([
    [pictureUrl, <img alt="Profile Avatar" src={pictureUrl} />],
    <h3 style={{ fontSize }}>{initials}</h3>
  ]);

  const css = makeClass([
    'm-misc-profile-picture',
    [circle, 'm-misc-profile-picture--circle'],
    [className, className]
  ]);

  return (
    <div className={css} style={{ height: size, minWidth: size, width: size }}>
      {body}
    </div>
  );
};

export default ProfilePicture;
