import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { useStoreActions } from '@store/Store';
import ApplicantsModal from '../ApplicantsModal';
import ApplicantsRespondButton from '../ApplicantsRespondButton';
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

const ApplicantsCardActionContainer = () => {
  const applicantId = CardStore.useStoreState((store) => store.applicant.id);

  return (
    <Row equal marginTopAuto>
      <ApplicantsRespondButton
        applicantIds={[applicantId]}
        response="ACCEPTED"
      />

      <ApplicantsRespondButton
        applicantIds={[applicantId]}
        response="REJECTED"
      />
    </Row>
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
      <ApplicantsCardActionContainer />
      <ApplicantsModal id={`EXPANDED_APPLICANT_CARD-${applicantId}`} />
    </Card>
  );
};

export default ApplicantsCard;
