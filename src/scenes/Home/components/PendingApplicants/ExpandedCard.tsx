/**
 * @fileoverview Scene: ExpandedCard
 * @author Rami Abdou
 */

import React from 'react';
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoMdArrowBack
} from 'react-icons/io';

import { QuestionType } from '@constants';
import { ResolvedApplicantData } from '@store/schema';
import CSSModifier from '@util/CSSModifier';
import Applicant from './Applicant.store';

type CardQuestionProps = {
  type: QuestionType;
  question: string;
  value: string;
};

const CardQuestion = ({ question, type, value }: CardQuestionProps) => {
  const { css } = new CSSModifier()
    .class('s-applicants-card-question')
    .class('s-applicants-expanded-question')
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

const Header = () => {
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

  return (
    <div className="s-applicants-expanded-header">
      <IoMdArrowBack className="back-arrow" style={{ height: 32, width: 32 }} />
      <h1>{`${firstName} ${lastName}`}</h1>

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

export default () => {
  const data = Applicant.useStoreState(({ applicant }) =>
    (applicant.applicantData as ResolvedApplicantData[])?.filter(
      ({ question }) => !['FIRST_NAME', 'LAST_NAME'].includes(question.category)
    )
  );

  return (
    <div className="s-applicants-expanded">
      <Header />
      <div>
        {data.map(({ question, value }) => (
          <CardQuestion
            key={question.title}
            question={question.title}
            type={question.type}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};
