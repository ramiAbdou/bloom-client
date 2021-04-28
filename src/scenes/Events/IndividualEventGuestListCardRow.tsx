import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { modalVar } from '@core/state/Modal.state';
import useIsMember from '@hooks/useIsMember';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IEventGuest } from '@util/constants.entities';
import { cx } from '@util/util';

const IndividualEventGuestListCardRow: ComponentWithFragments<IEventGuest> = ({
  data: eventGuest
}) => {
  const isMember: boolean = useIsMember();

  const { member, supporter } = eventGuest;

  const firstName: string = member?.firstName ?? supporter?.firstName;
  const lastName: string = member?.lastName ?? supporter?.lastName;
  const fullName: string = `${firstName} ${lastName}`;

  const onClick = (): void => {
    if (isMember && member?.id) {
      modalVar({ id: ModalType.VIEW_PROFILE, metadata: member?.id });
    }
  };

  const css: string = cx('s-events-individual-member', {
    's-events-individual-member--disabled': !isMember
  });

  return (
    <Button className={css} onClick={onClick}>
      <ProfilePicture
        firstName={firstName}
        fontSize={16}
        lastName={lastName}
        pictureUrl={member?.pictureUrl}
        size={36}
      />

      <p className="body--bold">{fullName}</p>
    </Button>
  );
};

IndividualEventGuestListCardRow.fragment = gql`
  fragment IndividualEventGuestListCardRowFragment on event_guests {
    member {
      id
      firstName
      lastName
      pictureUrl
    }

    supporter {
      id
      firstName
      lastName
    }
  }
`;

export default IndividualEventGuestListCardRow;
