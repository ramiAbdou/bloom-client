import React from 'react';

import { IdProps } from '@constants';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
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
      return store.expandedData
        .filter(({ question }) => {
          return !['FIRST_NAME', 'LAST_NAME'].includes(question.category);
        })
        .map(({ question, value }) => {
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
