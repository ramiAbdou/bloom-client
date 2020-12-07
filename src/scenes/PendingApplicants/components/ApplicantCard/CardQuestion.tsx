import React, { memo } from 'react';

import { QuestionType } from '@constants';
import { makeClass } from '@util/util';

type CardQuestionProps = {
  expanded?: boolean;
  type: QuestionType;
  question: string;
  value: string;
};

export default memo(
  ({ expanded, question, type, value }: CardQuestionProps) => {
    const css = makeClass([
      's-applicants-card-question',
      [expanded, 's-applicants-expanded-question'],
      [
        ['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type),
        's-applicants-card-question--choice'
      ]
    ]);

    return (
      <div className={css}>
        <p>{question}</p>
        <p>{value ?? 'N/A'}</p>
      </div>
    );
  }
);
