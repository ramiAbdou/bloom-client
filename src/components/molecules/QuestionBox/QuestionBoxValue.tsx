import React from 'react';

import Attribute from '@atoms/Tag/Attribute';
import { QuestionType } from '@constants';
import { QuestionBoxItemProps } from './QuestionBox.types';

const QuestionBoxValue: React.FC<
  Pick<QuestionBoxItemProps, 'show' | 'type' | 'value'>
> = ({ show, type, value }) => {
  if (show === false) return null;

  if (
    [QuestionType.MULTIPLE_CHOICE, QuestionType.MULTIPLE_SELECT].includes(
      type
    ) &&
    Array.isArray(value) &&
    value?.length
  ) {
    value = value.toString();
  }

  let body: React.ReactNode = <p>{value}</p>;

  if (type === QuestionType.MULTIPLE_CHOICE) {
    body = <Attribute showNullValue>{value}</Attribute>;
  }

  if (type === QuestionType.MULTIPLE_SELECT) {
    body = (
      <>
        {value?.split(',').map((element: string) => (
          <Attribute key={element} showNullValue>
            {element?.trim()}
          </Attribute>
        ))}
      </>
    );
  }

  return <div>{body}</div>;
};

export default QuestionBoxValue;
