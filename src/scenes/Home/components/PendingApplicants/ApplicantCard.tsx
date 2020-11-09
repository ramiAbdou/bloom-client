/**
 * @fileoverview Scene: ApplicantCard
 * @author Rami Abdou
 */

import moment from 'moment-timezone';
import React from 'react';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

import UnderlineButton from '@components/Button/UnderlineButton';
import { QuestionType } from '@constants';
import { IPendingApplicant, ResolvedApplicantData } from '@store/schema';
import CSSModifier from '@util/CSSModifier';

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
      <p>{value}</p>
    </div>
  );
};

type CardHeaderProps = { createdAt: string; fullName: string };

const CardHeader = ({ createdAt, fullName }: CardHeaderProps) => (
  <div className="s-applicants-card-header">
    <div>
      <p>Applied {moment(createdAt).format('M/D/YY')}</p>
      <h3 className="c-form">{fullName}</h3>
    </div>

    <div>
      <button>
        <IoIosCheckmarkCircle />
      </button>

      <button>
        <IoIosCloseCircle />
      </button>
    </div>
  </div>
);

export default ({ createdAt, applicantData }: IPendingApplicant) => {
  const data = applicantData as ResolvedApplicantData[];
  const { value: firstName } = data.find(
    ({ question }) => question.category === 'FIRST_NAME'
  );

  const { value: lastName } = data.find(
    ({ question }) => question.category === 'LAST_NAME'
  );

  const filteredQuestions = data.filter(
    ({ question }) => question.inApplicantCard
  );

  return (
    <div className="s-applicants-card">
      <CardHeader createdAt={createdAt} fullName={`${firstName} ${lastName}`} />
      {filteredQuestions.map(({ question, value }) => (
        <CardQuestion
          key={question.title}
          question={question.title}
          type={question.type}
          value={value}
        />
      ))}
      <UnderlineButton title="See Full Application" />
    </div>
  );
};
