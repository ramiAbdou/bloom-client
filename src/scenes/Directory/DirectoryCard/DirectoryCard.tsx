import deepequal from 'fast-deep-equal';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import DirectoryCardModal from '../DirectoryModal/DirectoryModal';
import MemberCard, { MemberCardModel } from './DirectoryCard.store';

const DirectoryCardInformation: React.FC = () => {
  const data = MemberCard.useStoreState((store) => store.data);

  const value = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;

    const questionId = db.community.questions?.find((id) => {
      return byQuestionId[id]?.inDirectoryCard;
    });

    return data?.find(({ question }) => question === questionId)?.value;
  });

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

  const css = cx('s-directory-card', {
    's-directory-card--empty': !highlightedValue
  });

  return (
    <Card noPadding className={css} onClick={onClick}>
      <ProfilePicture
        firstName={firstName}
        fontSize={60}
        href={pictureUrl}
        lastName={lastName}
      />

      <DirectoryCardInformation />
    </Card>
  );
};

const DirectoryCard = ({ data }: RenderComponentProps<MemberCardModel>) => (
  <MemberCard.Provider runtimeModel={data}>
    <DirectoryCardContent />
    <DirectoryCardModal id={`${ModalType.DIRECTORY_CARD}-${data.id}`} />
  </MemberCard.Provider>
);

export default DirectoryCard;
