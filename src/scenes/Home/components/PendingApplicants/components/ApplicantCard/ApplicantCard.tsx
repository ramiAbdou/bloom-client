/**
 * @fileoverview Scene: ApplicantCard
 * @author Rami Abdou
 */

import React, { useMemo } from 'react';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

import UnderlineButton from '@components/Button/UnderlineButton';
import Flow from '@components/Flow/Flow';
import { QuestionType } from '@constants';
import useTraceUpdate from '@hooks/useTraceUpdate';
import { FlowScreen } from '@store/Flow.store';
import { useStoreActions, useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import Applicant from './Applicant.store';
import ExpandedCard from './ExpandedCard';

type CardQuestionProps = {
  type: QuestionType;
  question: string;
  value: string;
};

const CardQuestion = ({ question, type, value }: CardQuestionProps) => {
  const { css } = new CSSModifier()
    .class('s-applicants-card-question')
    .addClass(
      ['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type),
      's-applicants-card-question--choice'
    );

  return (
    <div className={css}>
      <p>{question}</p>
      <p>{value ?? 'N/A'}</p>
    </div>
  );
};

const CardHeader = () => {
  const createdAt = Applicant.useStoreState((store) => store.createdAt);
  const fullName = Applicant.useStoreState((store) => store.fullName);
  useTraceUpdate({ createdAt, fullName });

  return (
    <div className="s-applicants-card-header">
      <div>
        <p>Applied {createdAt}</p>
        <h3 className="c-form">{fullName}</h3>
      </div>

      <div>
        <button className="s-applicants-card-action" value="Accept">
          <IoIosCheckmarkCircle />
        </button>

        <button className="s-applicants-card-action" value="Ignore">
          <IoIosCloseCircle />
        </button>
      </div>
    </div>
  );
};

const ExpandButton = () => {
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
};

export default () => {
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
};
