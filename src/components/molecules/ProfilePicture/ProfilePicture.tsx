import React, { useState } from 'react';

import Show from '@containers/Show';
import { Identifier, IMember, ISupporter } from '@db/db.entities';
import { GQL } from '@gql/gql.types';
import useGQL from '@gql/useGQL';
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
  const gql: GQL = useGQL();
  // If there is an error rendering the image for whatever reason (URL is no
  // longer valid, etc.) we should show something else.
  const [imageError, setImageError] = useState(false);

  const member: IMember = gql.members.fromCache({
    fields: ['firstName', 'lastName', 'email', 'pictureUrl'],
    id: memberId
  });

  const supporter: ISupporter = gql.supporters.fromCache({
    fields: ['firstName', 'lastName', 'email', 'pictureUrl'],
    id: supporterId
  });

  // If one of these is null, it means the user isn't fully loaded yet.
  const firstName: string = useStoreState(
    ({ db }) =>
      member?.firstName ?? supporter?.firstName ?? db.member?.firstName
  );

  const lastName: string = useStoreState(
    ({ db }) => member?.lastName ?? supporter?.lastName ?? db.member?.lastName
  );

  const pictureUrl: string = useStoreState(
    ({ db }) =>
      member?.pictureUrl ?? supporter?.pictureUrl ?? db.member?.pictureUrl
  );

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

  const gql: GQL = useGQL();

  const doesMemberOrSupporterExist: boolean = useStoreState(({ db }) => {
    if (memberId) return !!gql.members.fromCache({ id: memberId })?.id;
    if (supporterId) return !!gql.supporters.fromCache({ id: supporterId })?.id;
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
