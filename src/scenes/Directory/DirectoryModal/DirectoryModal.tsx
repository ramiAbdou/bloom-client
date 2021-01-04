import React from 'react';

import Separator from '@atoms/Separator';
import QuestionValueList from '@components/Elements/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
import { IdProps } from '@constants';
import DirectoryCard from '../DirectoryCard/DirectoryCard.store';
import UserInformationContainer from './UserInformation';

const CommunityData = () => {
  const items = DirectoryCard.useStoreState((store) => store.expandedCardData);

  if (!items?.length) {
    return <p>Looks like this user hasn't finished onboarding yet!</p>;
  }

  return <QuestionValueList items={items} />;
};

export default ({ id }: IdProps) => (
  <Modal className="s-directory-modal" id={id}>
    <UserInformationContainer />
    <Separator style={{ marginBottom: 24 }} />
    <CommunityData />
  </Modal>
);
