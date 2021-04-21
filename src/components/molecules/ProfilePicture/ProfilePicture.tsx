import React, { useState } from 'react';

import { Identifier, IMember, ISupporter } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { BaseProps } from '@util/constants';
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
  memberId,
  pictureUrl,
  supporterId,
  size
}) => {
  // If there is an error rendering the image for whatever reason (URL is no
  // longer valid, etc.) we should show something else.
  const [imageError, setImageError] = useState(false);

  const { data: member, loading: loading1 } = useFindOne(IMember, {
    fields: ['firstName', 'lastName', 'email', 'pictureUrl'],
    where: { id: memberId }
  });

  const { data: supporter, loading: loading2 } = useFindOne(ISupporter, {
    fields: ['firstName', 'lastName', 'email', 'pictureUrl'],
    where: { id: supporterId }
  });

  if (loading1 || loading2) return null;

  // If one of these is null, it means the user isn't fully loaded yet.
  firstName = firstName ?? member?.firstName ?? supporter?.firstName;
  lastName = lastName ?? member?.lastName ?? supporter?.lastName;
  pictureUrl = pictureUrl ?? member?.pictureUrl ?? supporter?.pictureUrl;

  const initials: string =
    firstName && lastName ? firstName[0] + lastName[0] : '';

  if (pictureUrl && !imageError) {
    const onError = () => {
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

  const { data: member, loading: loading1 } = useFindOne(IMember, {
    where: { id: memberId }
  });

  const { data: supporter, loading: loading2 } = useFindOne(ISupporter, {
    where: { id: supporterId }
  });

  if (loading1 || loading2) return null;

  if (!member?.id && !supporter?.id && (!firstName || !lastName)) {
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
