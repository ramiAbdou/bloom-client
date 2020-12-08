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

export default ({ id }: IdProps) => {
  const expandedCardData = MemberCard.useStoreState(
    (store) => store.member?.expandedCardData,
    deepequal
  );

  return (
    <Modal className="s-directory-modal" id={id}>
      <UserInformation />
      <Separator style={{ marginBottom: 24, marginTop: 24 }} />
      <div className="s-directory-modal-data-ctr">
        {expandedCardData.map(({ title, type, value }) => (
          <Question key={title} title={title} type={type} value={value} />
        ))}
      </div>
    </Modal>
  );
};
