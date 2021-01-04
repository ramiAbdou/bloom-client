import React from 'react';

import QuestionValueList, {
  QuestionValueItemProps
} from '@components/Elements/QuestionValueList';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import ApplicantsCardStore from '../ApplicantsCard/ApplicantsCard.store';

const ApplicantsModal: React.FC<IdProps> = ({ id }) => {
  const fullName = ApplicantsCardStore.useStoreState((store) => store.fullName);

  const items: QuestionValueItemProps[] = ApplicantsCardStore.useStoreState(
    (store) => {
      return store.data.map(({ question, value }) => {
        return { title: question.title, type: question.type, value };
      });
    }
  );

  return (
    <Modal id={id}>
      <div className="s-applicants-expanded">
        <h1>{fullName}</h1>
        <QuestionValueList items={items} />
      </div>
    </Modal>
  );
};

export default ApplicantsModal;
