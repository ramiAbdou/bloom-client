/**
 * @fileoverview Scene: ApplicantCard
 * @author Rami Abdou
 */

import React, { memo, useMemo } from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import Flow from '@components/Flow/Flow';
import { FlowScreen } from '@store/Flow.store';
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
  const FLOW_ID = `EXPANDED_APPLICANT_CARD-${applicantId}`;

  const id = useStoreState(({ flow }) => flow.id);
  const isShowing = useStoreState(({ flow }) => flow.isShowing);
  const showFlow = useStoreActions(({ flow }) => flow.showFlow);

  const onClick = () => {
    const screens: FlowScreen[] = [{ node: <ExpandedCard /> }];
    showFlow({ id: FLOW_ID, screens });
  };

  const shouldShowFlow = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  return (
    <>
      {shouldShowFlow && <Flow />}
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
