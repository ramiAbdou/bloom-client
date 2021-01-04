import React, { memo, ReactNode } from 'react';

import { QuestionType, ValueProps } from '@constants';
import { takeFirst } from '@util/util';
import Attribute from '../../atoms/Tags/Attribute';
import FormLabel from '../../organisms/Form/components/Label';

export interface QuestionValueItemProps extends ValueProps {
  hideNullValue?: boolean;
  title: string;
  type: QuestionType;
}

interface QuestionValueListProps {
  hideNullValue?: boolean;
  items: QuestionValueItemProps[];
  marginBottom?: number;
}

const Value = memo(({ type, value }: Partial<QuestionValueItemProps>) => {
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
});

/**
 * Returns a the Question and Answer components that are dependent on the type
 * of the question.
 */
const QuestionValue: React.FC<QuestionValueItemProps> = ({
  hideNullValue,
  title,
  type,
  value
}) => {
  if (hideNullValue && !value) return null;

  return (
    <div className="c-misc-question">
      <FormLabel small>{title}</FormLabel>
      <Value type={type} value={value} />
    </div>
  );
};

const QuestionValueList: React.FC<QuestionValueListProps> = ({
  hideNullValue,
  items,
  marginBottom
}) => {
  if (!items) return null;

  return (
    <div style={{ marginBottom }}>
      {items.map((item: QuestionValueItemProps) => (
        <QuestionValue
          key={item.title}
          hideNullValue={hideNullValue}
          {...item}
        />
      ))}
    </div>
  );
};

export default QuestionValueList;
