import React from 'react';

import Separator from '@atoms/Separator';
import { IdProps } from '@constants';
import QuestionValueList from '@molecules/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
import DirectoryCard from '../DirectoryCard/DirectoryCard.store';
import UserInformationContainer from './UserInformation';

const DirectoryModalData: React.FC = () => {
  const items = DirectoryCard.useStoreState((store) => store.expandedCardData);

  if (!items?.length) {
    return <p>Looks like this user hasn't finished onboarding yet!</p>;
  }

  return <QuestionValueList items={items} />;
};

const DirectoryModal: React.FC<IdProps> = ({ id }) => (
  <Modal className="s-directory-modal" id={id}>
    <UserInformationContainer />
    <Separator marginBottom={24} />
    <DirectoryModalData />
  </Modal>
);

export default DirectoryModal;
