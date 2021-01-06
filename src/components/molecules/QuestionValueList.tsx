import React, { ReactNode } from 'react';

import { QuestionType, ValueProps } from '@constants';
import { takeFirst } from '@util/util';
import Attribute from '../atoms/Tags/Attribute';
import FormLabel from '../organisms/Form/FormLabel';

export interface QuestionValueItemProps extends ValueProps {
  hideNullValue?: boolean;
  large?: boolean;
  title: string;
  type: QuestionType;
}

interface QuestionValueListProps {
  hideNullValue?: boolean;
  large?: boolean;
  items: QuestionValueItemProps[];
  marginBottom?: number;
}

const Value = ({ type, value }: Partial<QuestionValueItemProps>) => {
  const body: ReactNode = takeFirst([
    [!value, <p>N/A</p>],
    [type === 'MULTIPLE_CHOICE', <Attribute showNullValue>{value}</Attribute>],
    [
      type === 'MULTIPLE_SELECT',
      <>
        {value?.split(',').map((val: string) => (
          <Attribute key={val} showNullValue>
            {val?.trim()}
          </Attribute>
        ))}
      </>
    ],
    <p>{value}</p>
  ]);

  return <div>{body}</div>;
};

/**
 * Returns a the Question and Answer components that are dependent on the type
 * of the question.
 */
const QuestionValue: React.FC<QuestionValueItemProps> = ({
  hideNullValue,
  large,
  title,
  type,
  value
}) => {
  if (hideNullValue && !value) return null;

  return (
    <div className="m-misc-question">
      <FormLabel small={!large}>{title}</FormLabel>
      <Value type={type} value={value} />
    </div>
  );
};

const QuestionValueList: React.FC<QuestionValueListProps> = ({
  items,
  marginBottom,
  ...props
}) => {
  if (!items) return null;

  return (
    <div className="m-misc-question-ctr" style={{ marginBottom }}>
      {items.map((item: QuestionValueItemProps) => (
        <QuestionValue key={item.title} {...item} {...props} />
      ))}
    </div>
  );
};

export default QuestionValueList;
