/**
 * @fileoverview Scene: ApplicantCard
 * @author Rami Abdou
 */

import React, { memo, useMemo } from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import { AcceptButton, IgnoreButton } from './ActionButton';
import Applicant from './ApplicantCard.store';
import CardQuestion from './CardQuestion';
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

  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => showModal({ id: MODAL_ID });

  const shouldShowModal = useMemo(() => isShowing && MODAL_ID === id, [
    isShowing,
    id === MODAL_ID
  ]);

  return (
    <>
      <Modal isShowing={shouldShowModal}>
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
        {data.map(({ question, value }) => (
          <CardQuestion
            key={question.title}
            question={question.title}
            type={question.type}
            value={value}
          />
        ))}
      </div>

      <ExpandButton />
    </div>
  );
});
