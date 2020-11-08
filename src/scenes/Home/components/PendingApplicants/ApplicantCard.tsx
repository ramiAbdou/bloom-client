/**
 * @fileoverview Scene: ApplicantCard
 * @author Rami Abdou
 */

import moment from 'moment-timezone';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

import { QuestionType } from '@constants';
import { IPendingApplicant, ResolvedApplicantData } from '@store/schema';

type CardQuestionProps = {
  type: QuestionType;
  question: string;
  value: string;
};

const CardQuestion = ({ question, type, value }: CardQuestionProps) => {
  return (
    <div className="s-applicants-card-question">
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

  const { question: membershipQuestion, value: membershipType } = data.find(
    ({ question }) => question.category === 'MEMBERSHIP_TYPE'
  );

  return (
    <div className="s-applicants-card">
      <CardHeader createdAt={createdAt} fullName={`${firstName} ${lastName}`} />
      <CardQuestion
        question={membershipQuestion.title}
        type={membershipQuestion.type}
        value={membershipType}
      />
    </div>
  );
};
