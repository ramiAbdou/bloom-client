import deepequal from 'fast-deep-equal';
import React from 'react';

import QuestionValue from '@components/Elements/QuestionValue';
import Separator from '@components/Misc/Separator';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import DirectoryCard from '../../stores/Card.store';
import UserInformationContainer from './UserInformation';

const CommunityData = () => {
  const expandedCardData = DirectoryCard.useStoreState(
    (store) => store.expandedCardData,
    deepequal
  );

  if (!expandedCardData?.length) {
    return <p>Looks like this user hasn't finished onboarding yet!</p>;
  }

  return (
    <>
      {expandedCardData.map(({ title, type, value }) => (
        <QuestionValue
          key={title}
          hideNullValue
          title={title}
          type={type}
          value={value}
        />
      ))}
    </>
  );
};

export default ({ id }: IdProps) => (
  <Modal className="s-directory-modal" id={id}>
    <UserInformationContainer />
    <Separator style={{ marginBottom: 24, marginTop: 24 }} />
    <CommunityData />
  </Modal>
);
