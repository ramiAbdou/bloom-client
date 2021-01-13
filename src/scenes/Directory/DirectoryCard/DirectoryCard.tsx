import deepequal from 'fast-deep-equal';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import Button from '@atoms/Button';
import { ModalType } from '@constants';
import ProfilePicture from '@molecules/ProfilePicture';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import DirectoryCardModal from '../DirectoryModal/DirectoryModal';
import MemberCard, { MemberCardModel } from './DirectoryCard.store';

const DirectoryCardInformation: React.FC = () => {
  const value = MemberCard.useStoreState((store) => store.highlightedValue);

  const fullName = MemberCard.useStoreState(({ firstName, lastName }) => {
    return `${firstName} ${lastName}`;
  });

  return (
    <div className="s-directory-card-content">
      <p>
        {fullName} <span>{value ?? ''}</span>
      </p>
    </div>
  );
};

const DirectoryCardContent: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const {
    highlightedValue,
    firstName,
    id,
    lastName,
    pictureUrl
  } = MemberCard.useStoreState((store) => store, deepequal);

  const onClick = () => showModal(`${ModalType.DIRECTORY_CARD}-${id}`);

  const css = makeClass([
    's-directory-card',
    [!highlightedValue, 's-directory-card--empty']
  ]);

  return (
    <>
      <Button className={css} onClick={onClick}>
        <ProfilePicture
          firstName={firstName}
          fontSize={60}
          lastName={lastName}
          pictureUrl={pictureUrl}
        />

        <DirectoryCardInformation />
      </Button>

      <DirectoryCardModal id={`${ModalType.DIRECTORY_CARD}-${id}`} />
    </>
  );
};

const DirectoryCard = ({ data }: RenderComponentProps<MemberCardModel>) => (
  <MemberCard.Provider runtimeModel={data}>
    <DirectoryCardContent />
  </MemberCard.Provider>
);

export default DirectoryCard;
