import React from 'react';

import QuestionValueList, {
  QuestionValueItemProps
} from '@components/Elements/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
import { IdProps } from '@constants';
import ActionContainer from '@templates/ActionContainer/ActionContainer';
import ApplicantsCardStore from './ApplicantsCard/ApplicantsCard.store';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsModalActionContainer: React.FC = () => {
  const applicantId = ApplicantsCardStore.useStoreState(
    (store) => store.applicant.id
  );

  return (
    <ActionContainer equal>
      <ApplicantsRespondButton
        applicantIds={[applicantId]}
        response="ACCEPTED"
      />

      <ApplicantsRespondButton
        applicantIds={[applicantId]}
        response="REJECTED"
      />
    </ActionContainer>
  );
};

const ApplicantsModal: React.FC<IdProps> = ({ id }) => {
  const fullName = ApplicantsCardStore.useStoreState((store) => store.fullName);

  const items: QuestionValueItemProps[] = ApplicantsCardStore.useStoreState(
    (store) => {
      return store.expandedData.map(({ question, value }) => {
        return { title: question.title, type: question.type, value };
      });
    }
  );

  return (
    <Modal id={id}>
      <h1>{fullName}</h1>
      <QuestionValueList items={items} marginBottom={24} />
      <ApplicantsModalActionContainer />
    </Modal>
  );
};

export default ApplicantsModal;
