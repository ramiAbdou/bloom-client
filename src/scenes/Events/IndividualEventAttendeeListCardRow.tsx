import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import useIsMember from '@hooks/useIsMember';
import { ComponentWithFragments } from '@util/constants';
import { IEventAttendee } from '@util/constants.entities';
import { cx } from '@util/util';

const IndividualEventAttendeeListCardRow: ComponentWithFragments<IEventAttendee> = ({
  data: eventAttendee
}) => {
  const isMember: boolean = useIsMember();

  const { member, supporter } = eventAttendee;

  const firstName: string = member?.firstName ?? supporter?.firstName;
  const lastName: string = member?.lastName ?? supporter?.lastName;
  const fullName: string = `${firstName} ${lastName}`;

  const onClick = (): void => {
    if (isMember && member?.id) {
      showModal({ id: ModalType.VIEW_PROFILE, metadata: member?.id });
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

IndividualEventAttendeeListCardRow.fragment = gql`
  fragment IndividualEventAttendeeListCardRowFragment on event_attendees {
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

export default IndividualEventAttendeeListCardRow;
