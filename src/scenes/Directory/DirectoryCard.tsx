import gql from 'graphql-tag';
import React from 'react';

import Card from '@components/containers/Card/Card';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import DirectoryCardFullName from './DirectoryCardFullName';
import DirectoryCardPicture from './DirectoryCardPicture';
import DirectoryCardPosition from './DirectoryCardPosition';
import DirectoryCardRole from './DirectoryCardRole';

const DirectoryCard: ComponentWithFragments<IMember> = ({ data: member }) => {
  const onClick = (): void => {
    showModal({ id: ModalType.VIEW_PROFILE, metadata: member.id });
  };

  return (
    <Card noPadding className="f f-ac s-directory-card" onClick={onClick}>
      <DirectoryCardRole data={member} />
      <DirectoryCardPicture data={member} />

      <div className="s-directory-card-content">
        <p>
          <DirectoryCardFullName data={member} />
          <DirectoryCardPosition data={member} />
        </p>
      </div>
    </Card>
  );
};

DirectoryCard.fragment = gql`
  fragment DirectoryCardFragment on members {
    id
    ...DirectoryCardFullNameFragment
    ...DirectoryCardPictureFragment
    ...DirectoryCardPositionFragment
    ...DirectoryCardRoleFragment
  }
  ${DirectoryCardFullName.fragment}
  ${DirectoryCardPicture.fragment}
  ${DirectoryCardPosition.fragment}
  ${DirectoryCardRole.fragment}
`;

export default DirectoryCard;
