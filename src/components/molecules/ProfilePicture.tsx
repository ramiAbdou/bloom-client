import React from 'react';

import { ClassNameProps } from '@constants';
import { makeClass, takeFirst } from '@util/util';

interface ProfilePictureProps extends ClassNameProps {
  circle?: boolean;
  firstName: string;
  fontSize?: number;
  lastName: string;
  pictureUrl: string;
  size?: number;
}

export default ({
  circle,
  className,
  fontSize,
  firstName,
  lastName,
  pictureUrl,
  size
}: ProfilePictureProps) => {
  // If one of these is null, it means the user isn't fully loaded yet.
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
    <div className={css} style={{ height: size, width: size }}>
      {body}
    </div>
  );
};
