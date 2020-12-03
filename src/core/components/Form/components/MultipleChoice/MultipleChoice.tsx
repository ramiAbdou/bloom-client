/**
 * @fileoverview Component: MultipleChoice
 * - Multiple choice case in which there are less than 5 options present.

 */

import React, { useState } from 'react';

import { OnClickProps } from '@constants';
import { makeClass } from '@util/util';
import Form from '../../Form.store';
import { FormItemData } from '../../Form.types';

interface ChoiceProps extends OnClickProps {
  isSelected: boolean;
  option: string;
}

const Choice = ({ isSelected, onClick, option }: ChoiceProps) => {
  const css = makeClass([
    'c-form-mc-choice',
    [isSelected, 'c-form-mc-choice--active']
  ]);

  return (
    <button className={css} onClick={onClick}>
      <div>
        <div />
      </div>
      <p className="c-form-choice-txt">{option}</p>
    </button>
  );
};

// We use local state to see which option is selected.
export default ({ options, title }: FormItemData) => {
  const [selectedOption, setSelectedOption] = useState('');
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const selectOption = (option: string) => {
    updateItem({ title, value: option });
    setSelectedOption(option);
  };

  return (
    <>
      {options.map((option: string) => (
        <Choice
          key={option}
          isSelected={option === selectedOption}
          option={option}
          onClick={() => selectOption(option)}
        />
      ))}
    </>
  );
};
