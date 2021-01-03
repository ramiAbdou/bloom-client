import deepequal from 'fast-deep-equal';
import React, { memo } from 'react';

import Button from '@atoms/Button';
import Card from '@components/Elements/Card/Card';
import QuestionValue from '@components/Elements/QuestionValue';
import Modal from '@components/Modal/Modal';
import { useStoreActions } from '@store/Store';
import { AcceptButton, IgnoreButton } from './ActionButton';
import CardStore from './Card.store';
import ExpandedCard from './ExpandedCard';

const CardHeader = () => {
  const createdAt = CardStore.useStoreState((store) => store.createdAt);
  const fullName = CardStore.useStoreState((store) => store.fullName);

  return (
    <div className="s-applicants-card-header">
      <div>
        <p>Applied {createdAt}</p>
        <h3 className="c-form">{fullName}</h3>
      </div>

      <div>
        <AcceptButton />
        <IgnoreButton />
      </div>
    </div>
  );
};

const ExpandButton = memo(() => {
  const applicantId = CardStore.useStoreState(({ applicant }) => applicant.id);
  const MODAL_ID = `EXPANDED_APPLICANT_CARD-${applicantId}`;
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(MODAL_ID);

  return (
    <>
      <Modal id={MODAL_ID}>
        <ExpandedCard />
      </Modal>

      <Button underline onClick={onClick}>
        See Full Application
      </Button>
    </>
  );
});

export default () => {
  const data = CardStore.useStoreState((store) => store.data, deepequal);

  return (
    <Card className="s-applicants-card">
      <div>
        <CardHeader />
        {data.map(({ question: { title, type }, value }) => (
          <QuestionValue key={title} title={title} type={type} value={value} />
        ))}
      </div>

      <ExpandButton />
    </Card>
  );
};
