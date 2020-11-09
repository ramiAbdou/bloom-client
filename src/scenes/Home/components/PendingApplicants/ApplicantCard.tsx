/**
 * @fileoverview Scene: ApplicantCard
 * @author Rami Abdou
 */

import moment from 'moment-timezone';
import React from 'react';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

import UnderlineButton from '@components/Button/UnderlineButton';
import Flow from '@components/Flow/Flow';
import { QuestionType } from '@constants';
import { FlowScreen } from '@store/Flow.store';
import { ResolvedApplicantData } from '@store/schema';
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
  const { value: firstName } = Applicant.useStoreState(({ applicant }) =>
    (applicant.applicantData as ResolvedApplicantData[])?.find(
      ({ question }) => question.category === 'FIRST_NAME'
    )
  );

  const { value: lastName } = Applicant.useStoreState(({ applicant }) =>
    (applicant.applicantData as ResolvedApplicantData[])?.find(
      ({ question }) => question.category === 'LAST_NAME'
    )
  );

  const createdAt = Applicant.useStoreState(
    ({ applicant }) => applicant.createdAt
  );

  return (
    <div className="s-applicants-card-header">
      <div>
        <p>Applied {moment(createdAt).format('M/D/YY')}</p>
        <h3 className="c-form">{`${firstName} ${lastName}`}</h3>
      </div>

      <div>
        <button className="s-applicants-card-action">
          <IoIosCheckmarkCircle />
        </button>

        <button className="s-applicants-card-action">
          <IoIosCloseCircle />
        </button>
      </div>
    </div>
  );
};

const ExpandButton = () => {
  const FLOW_ID = 'EXPANDED_APPLICANT_CARD';
  const id = useStoreState(({ flow }) => flow.id);
  const isShowing = useStoreState(({ flow }) => flow.isShowing);
  const showFlow = useStoreActions(({ flow }) => flow.showFlow);

  const onClick = () => {
    const screens: FlowScreen[] = [{ node: <ExpandedCard /> }];
    showFlow({ id: FLOW_ID, screens });
  };

  return (
    <>
      {isShowing && FLOW_ID === id && <Flow />}
      <UnderlineButton title="See Full Application" onClick={onClick} />
    </>
  );
};

export default () => {
  const data = Applicant.useStoreState(({ applicant }) =>
    (applicant.applicantData as ResolvedApplicantData[])?.filter(
      ({ question }) => question.inApplicantCard
    )
  );

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
