import gql from 'graphql-tag';
import React from 'react';

import Card from '@components/containers/Card/Card';
import { useStoreActions } from '@core/store/Store';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import DirectoryCardFullName from './DirectoryCardFullName';
import DirectoryCardPicture from './DirectoryCardPicture';
import DirectoryCardPosition from './DirectoryCardPosition';
import DirectoryCardRole from './DirectoryCardRole';

const DirectoryCard: ComponentWithFragments<IMember> = ({ data: member }) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = (): void => {
    showModal({ id: ModalType.PROFILE, metadata: member.id });
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

DirectoryCard.fragments = {
  data: gql`
    fragment DirectoryCardFragment on members {
      id
      ...DirectoryCardFullNameFragment
      ...DirectoryCardPictureFragment
      ...DirectoryCardPositionFragment
      ...DirectoryCardRoleFragment
    }
    ${DirectoryCardFullName.fragments.data}
    ${DirectoryCardPicture.fragments.data}
    ${DirectoryCardPosition.fragments.data}
    ${DirectoryCardRole.fragments.data}
  `
};

export default DirectoryCard;
