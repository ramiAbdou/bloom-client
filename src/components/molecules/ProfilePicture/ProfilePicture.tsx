import React, { useState } from 'react';

import Show from '@containers/Show';
import { Identifier } from '@db/db.entities';
import { useStoreState } from '@store/Store';
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

  // If one of these is null, it means the user isn't fully loaded yet.
  const firstName: string = useStoreState(({ db }) => {
    if (memberId) return db.byMemberId[memberId]?.firstName;
    if (supporterId) return db.bySupporterId[supporterId]?.firstName;
    return db.member?.firstName;
  });

  const lastName: string = useStoreState(({ db }) => {
    if (memberId) return db.byMemberId[memberId]?.lastName;
    if (supporterId) return db.bySupporterId[supporterId]?.lastName;
    return db.member?.lastName;
  });

  const pictureUrl: string = useStoreState(({ db }) => {
    if (memberId) return db.byMemberId[memberId]?.pictureUrl;
    if (supporterId) return db.bySupporterId[supporterId]?.pictureUrl;
    return db.member?.pictureUrl;
  });

  const initials: string = firstName[0] + lastName[0];

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

  const doesMemberOrSupporterExist: boolean = useStoreState(({ db }) => {
    if (memberId) return !!db.byMemberId[memberId];
    if (supporterId) return !!db.bySupporterId[supporterId];
    return !!db.member?.firstName && !!db.member?.lastName;
  });

  const css: string = cx(
    'm-profile-picture',
    { 'm-profile-picture--circle': circle },
    className
  );

  return (
    <Show show={doesMemberOrSupporterExist}>
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
