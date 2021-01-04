import React from 'react';

import Button from '@atoms/Button';
import Card from '@components/Elements/Card/Card';
import QuestionValueList, {
  QuestionValueItemProps
} from '@components/Elements/QuestionValueList';
import { useStoreActions } from '@store/Store';
import ActionContainer from '@templates/ActionContainer/ActionContainer';
import ApplicantsModal from '../ApplicantsModal/ApplicantsModal';
import CardStore from './ApplicantsCard.store';

const ApplicantsCardHeader = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const createdAt = CardStore.useStoreState((store) => store.createdAt);
  const applicantId = CardStore.useStoreState((store) => store.applicant.id);
  const fullName = CardStore.useStoreState((store) => store.fullName);

  const onClick = () => showModal(`EXPANDED_APPLICANT_CARD-${applicantId}`);

  return (
    <div className="s-applicants-card-header">
      <div>
        <p>Applied {createdAt}</p>
        <h3>{fullName}</h3>
      </div>

      <Button tertiary onClick={onClick}>
        See Full Application
      </Button>
    </div>
  );
};

const ApplicantsCard = () => {
  const items: QuestionValueItemProps[] = CardStore.useStoreState((store) => {
    return store.data.map(({ question, value }) => {
      return { title: question.title, type: question.type, value };
    });
  });

  const applicantId = CardStore.useStoreState(({ applicant }) => applicant.id);

  return (
    <Card className="s-applicants-card">
      <ApplicantsCardHeader />
      <QuestionValueList items={items} marginBottom={24} />

      <ActionContainer equal marginTopAuto>
        <Button primary onClick={() => null}>
          Accept
        </Button>

        <Button secondary onClick={() => null}>
          Reject
        </Button>
      </ActionContainer>

      <ApplicantsModal id={`EXPANDED_APPLICANT_CARD-${applicantId}`} />
    </Card>
  );
};

export default ApplicantsCard;
