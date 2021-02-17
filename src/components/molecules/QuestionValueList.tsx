import React from 'react';

import { QuestionType, ValueProps } from '@constants';
import Show from '@containers/Show';
import Attribute from '../atoms/Tag/Attribute';
import FormLabel from '../organisms/Form/FormLabel';

const Value = ({ type, value }: Partial<QuestionValueItemProps>) => {
  if (
    [QuestionType.MULTIPLE_CHOICE, QuestionType.MULTIPLE_SELECT].includes(
      type
    ) &&
    Array.isArray(value) &&
    value?.length
  ) {
    value = value.toString();
  }

  if (type === 'MULTIPLE_CHOICE' && Array.isArray(value) && value?.length) {
    value = value.toString();
  }

  const body: React.ReactNode = (!value && <p>N/A</p>) ||
    (type === 'MULTIPLE_CHOICE' && (
      <Attribute showNullValue>{value}</Attribute>
    )) ||
    (type === 'MULTIPLE_SELECT' && (
      <>
        {value?.split(',').map((val: string) => (
          <Attribute key={val} showNullValue>
            {val?.trim()}
          </Attribute>
        ))}
      </>
    )) || <p>{value}</p>;

  return <div>{body}</div>;
};

export interface QuestionValueItemProps extends ValueProps {
  handleNull?: 'HIDE_ALL' | 'HIDE_VALUE';
  title: string;
  type: QuestionType;
}

/**
 * Returns a the Question and Answer components that are dependent on the type
 * of the question.
 */
const QuestionValueListItem: React.FC<QuestionValueItemProps> = ({
  handleNull,
  title,
  type,
  value
}) => {
  return (
    <Show show={handleNull !== 'HIDE_ALL' || !!value}>
      <div className="m-misc-question">
        <FormLabel>{title}</FormLabel>
        {(value || handleNull !== 'HIDE_VALUE') && (
          <Value type={type} value={value} />
        )}
      </div>
    </Show>
  );
};

interface QuestionValueListProps
  extends Pick<QuestionValueItemProps, 'handleNull'> {
  items: QuestionValueItemProps[];
  marginBottom?: number;
}

const QuestionValueList: React.FC<QuestionValueListProps> = ({
  items,
  marginBottom,
  ...props
}) => {
  return (
    <Show show={!!items?.length}>
      <div className="m-misc-question-ctr" style={{ marginBottom }}>
        {items?.map((item: QuestionValueItemProps) => (
          <QuestionValueListItem key={item.title} {...item} {...props} />
        ))}
      </div>
    </Show>
  );
};

export default QuestionValueList;
