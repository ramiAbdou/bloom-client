import React from 'react';

import Button from '@atoms/Button';
import QuestionValueList, {
  QuestionValueItemProps
} from '@components/Elements/QuestionValueList';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import ActionContainer from '@templates/ActionContainer/ActionContainer';
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
      <h1>{fullName}</h1>
      <QuestionValueList items={items} marginBottom={24} />
      <ActionContainer equal>
        <Button primary>Accept</Button>
        <Button secondary>Reject</Button>
      </ActionContainer>
    </Modal>
  );
};

export default ApplicantsModal;
