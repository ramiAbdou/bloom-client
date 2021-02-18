import React from 'react';

import FormLabel from '@organisms/Form/FormLabel';
import { QuestionBoxItemProps } from './QuestionBox.types';
import QuestionBoxValue from './QuestionBoxValue';

/**
 * Returns a the Question and Answer components that are dependent on the type
 * of the question.
 */
const QuestionBoxItem: React.FC<QuestionBoxItemProps> = ({
  handleNull,
  title,
  type,
  value
}) => {
  if (handleNull === 'HIDE_ALL' && !value) return null;

  return (
    <div className="m-misc-question">
      <FormLabel>{title}</FormLabel>

      <QuestionBoxValue
        show={value || handleNull !== 'HIDE_VALUE'}
        type={type}
        value={value}
      />
    </div>
  );
};

interface QuestionBoxProps extends Pick<QuestionBoxItemProps, 'handleNull'> {
  items: QuestionBoxItemProps[];
  marginBottom?: number;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  items,
  marginBottom,
  ...props
}) => {
  if (!items?.length) return null;

  return (
    <div className="m-misc-question-ctr" style={{ marginBottom }}>
      {items?.map((item: QuestionBoxItemProps) => (
        <QuestionBoxItem key={item.title} {...item} {...props} />
      ))}
    </div>
  );
};

export default QuestionBox;
