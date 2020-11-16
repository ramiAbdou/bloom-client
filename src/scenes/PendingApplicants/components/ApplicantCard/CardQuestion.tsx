/**
 * @fileoverview Scene: ExpandedCard
 * @author Rami Abdou
 */

import React, { memo } from 'react';

import { QuestionType } from '@constants';
import CSSModifier from '@util/CSSModifier';

type CardQuestionProps = {
  expanded?: boolean;
  type: QuestionType;
  question: string;
  value: string;
};

export default memo(
  ({ expanded, question, type, value }: CardQuestionProps) => {
    const { css } = new CSSModifier()
      .class('s-applicants-card-question')
      .addClass(expanded, 's-applicants-expanded-question')
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
  }
);
