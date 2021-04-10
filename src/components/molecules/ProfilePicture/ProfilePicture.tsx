import React, { useState } from 'react';

import Show from '@components/containers/Show';
import { Identifier, IMember, ISupporter } from '@core/db/db.entities';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

interface ProfilePictureProps extends BaseProps {
  circle?: boolean;
  fontSize?: number;
  memberId?: Identifier;
  supporterId?: Identifier;
  size?: number;
}

const ProfilePictureContent: React.FC<ProfilePictureProps> = ({
  fontSize,
  memberId,
  supporterId,
  size
}) => {
  // If there is an error rendering the image for whatever reason (URL is no
  // longer valid, etc.) we should show something else.
  const [imageError, setImageError] = useState(false);

  const { data: member, loading: loading1 } = useFindOneFull(IMember, {
    fields: ['firstName', 'lastName', 'email', 'pictureUrl'],
    where: { id: memberId }
  });

  const { data: supporter, loading: loading2 } = useFindOneFull(ISupporter, {
    fields: ['firstName', 'lastName', 'email', 'pictureUrl'],
    where: { id: supporterId }
  });

  if (loading1 || loading2) return null;

  // If one of these is null, it means the user isn't fully loaded yet.
  const firstName: string = member?.firstName ?? supporter?.firstName;
  const lastName: string = member?.lastName ?? supporter?.lastName;
  const pictureUrl: string = member?.pictureUrl ?? supporter?.pictureUrl;

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
  const { circle = true, className, memberId, size, supporterId } = props;

  const { data: member, loading: loading1 } = useFindOneFull(IMember, {
    where: { id: memberId }
  });

  const { data: supporter, loading: loading2 } = useFindOneFull(ISupporter, {
    where: { id: supporterId }
  });

  if (loading1 || loading2) return null;

  const css: string = cx(
    'm-profile-picture',
    { 'm-profile-picture--circle': circle },
    className
  );

  return (
    <Show show={!!member.id || !!supporter.id}>
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
