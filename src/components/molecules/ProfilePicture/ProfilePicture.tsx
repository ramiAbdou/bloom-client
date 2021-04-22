import React, { useState } from 'react';

import { BaseProps } from '@util/constants';
import { Identifier } from '@util/constants.entities';
import { cx } from '@util/util';

interface ProfilePictureProps extends BaseProps {
  circle?: boolean;
  firstName?: string;
  fontSize?: number;
  lastName?: string;
  memberId?: Identifier;
  pictureUrl?: string;
  supporterId?: Identifier;
  size?: number;
}

const ProfilePictureContent: React.FC<ProfilePictureProps> = ({
  firstName,
  fontSize,
  lastName,
  pictureUrl,
  size
}) => {
  // If there is an error rendering the image for whatever reason (URL is no
  // longer valid, etc.) we should track the error to ensure that we don't
  // render that error.
  const [imageError, setImageError] = useState<boolean>(false);

  const initials: string =
    firstName && lastName ? firstName[0] + lastName[0] : '';

  if (pictureUrl && !imageError) {
    const onError = (): void => {
      setImageError(true);
    };

    return (
      <img
        alt="Profile Avatar"
        referrerPolicy="no-referrer"
        src={pictureUrl}
        onError={onError}
      />
    );
  }

  return <h3 style={{ fontSize: fontSize ?? size * 0.4 }}>{initials}</h3>;
};

const ProfilePicture: React.FC<ProfilePictureProps> = (props) => {
  const {
    circle = true,
    className,
    firstName,
    lastName,
    memberId,
    size,
    supporterId
  } = props;

  if (!memberId && !supporterId && (!firstName || !lastName)) {
    return null;
  }

  const css: string = cx(
    'm-profile-picture',
    { 'm-profile-picture--circle': circle },
    className
  );

  return (
    <div className={css} style={{ height: size, minWidth: size, width: size }}>
      <ProfilePictureContent {...props} />
    </div>
  );
};

export default ProfilePicture;
