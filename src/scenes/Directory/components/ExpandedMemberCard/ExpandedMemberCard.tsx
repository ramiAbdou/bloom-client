import deepequal from 'fast-deep-equal';
import React from 'react';

import Separator from '@components/Misc/Separator';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import { makeClass } from '@util/util';
import MemberCard from '../MemberCard/MemberCard.store';
import UserInformation from './UserInformation.container';

const Question = ({ title, type, value }) => {
  const css = makeClass([
    's-directory-modal-question',
    [
      ['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type),
      's-directory-modal-question--choice'
    ]
  ]);

  return (
    <div className={css}>
      <p>{title}</p>
      <p>{value ?? 'N/A'}</p>
    </div>
  );
};

const CommunityData = () => {
  const expandedCardData = MemberCard.useStoreState(
    (store) => store.member?.expandedCardData,
    deepequal
  );

  if (!expandedCardData?.length) {
    return <p>Looks like this user hasn't finished onboarding yet!</p>;
  }

  return (
    <>
      {expandedCardData.map(({ title, type, value }) => (
        <Question key={title} title={title} type={type} value={value} />
      ))}
    </>
  );
};

export default ({ id }: IdProps) => (
  <Modal className="s-directory-modal" id={id}>
    <UserInformation />
    <Separator style={{ marginBottom: 24, marginTop: 24 }} />
    <CommunityData />
  </Modal>
);
