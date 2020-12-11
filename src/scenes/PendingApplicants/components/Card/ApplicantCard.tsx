import React, { memo } from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import QuestionValue from '@components/Elements/QuestionValue';
import Modal from '@components/Modal/Modal';
import { useStoreActions } from '@store/Store';
import { AcceptButton, IgnoreButton } from './ActionButton';
import Applicant from './ApplicantCard.store';
import ExpandedCard from './ExpandedCard';

const CardHeader = () => {
  const createdAt = Applicant.useStoreState((store) => store.createdAt);
  const fullName = Applicant.useStoreState((store) => store.fullName);

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
  const applicantId = Applicant.useStoreState(({ applicant }) => applicant.id);
  const MODAL_ID = `EXPANDED_APPLICANT_CARD-${applicantId}`;
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(MODAL_ID);

  return (
    <>
      <Modal id={MODAL_ID}>
        <ExpandedCard />
      </Modal>

      <UnderlineButton title="See Full Application" onClick={onClick} />
    </>
  );
});

export default memo(() => {
  const data = Applicant.useStoreState((store) => store.data);

  return (
    <div className="s-applicants-card">
      <div>
        <CardHeader />
        {data.map(({ question: { title, type }, value }) => (
          <QuestionValue key={title} title={title} type={type} value={value} />
        ))}
      </div>

      <ExpandButton />
    </div>
  );
});
