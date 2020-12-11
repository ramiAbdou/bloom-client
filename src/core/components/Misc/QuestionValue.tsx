import React, { memo, ReactNode } from 'react';

import Tag from '@components/Misc/Tag';
import { QuestionType, ValueProps } from '@constants';
import { takeFirst } from '@util/util';

interface QuestionValueProps extends ValueProps {
  hideNullValue?: boolean;
  title: string;
  type: QuestionType;
}

const Value = memo(({ type, value }: Partial<QuestionValueProps>) => {
  const body: ReactNode = takeFirst([
    [!value, <p>N/A</p>],
    [type === 'MULTIPLE_CHOICE', <Tag value={value} />],
    [
      type === 'MULTIPLE_SELECT',
      <>
        {value?.split(',').map((val: string) => (
          <Tag key={val} value={val?.trim()} />
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
export default memo(
  ({ hideNullValue, title, type, value }: QuestionValueProps) => {
    if (hideNullValue && !value) return null;

    return (
      <div className="c-misc-question">
        <p>{title}</p>
        <Value type={type} value={value} />
      </div>
    );
  }
);
