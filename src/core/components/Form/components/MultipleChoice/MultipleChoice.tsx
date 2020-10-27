/**
 * @fileoverview Component: MultipleChoice
 * - Multiple choice case in which there are less than 5 options present.
 * @author Rami Abdou
 */

import React, { useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import Form from '../../Form.store';
import { FormItemData } from '../../Form.types';

type ChoiceProps = {
  isSelected: boolean;
  onClick: VoidFunction;
  option: string;
};

const Choice = ({ isSelected, onClick, option }: ChoiceProps) => {
  const primaryColor = Form.useStoreState((store) => store.primaryColor);
  const { css } = new CSSModifier()
    .class('c-form-mc-choice')
    .addClass(isSelected, 'c-form-mc-choice--active');

  const outerStyle = isSelected ? { border: `2px ${primaryColor} solid` } : {};
  const innerStyle = isSelected ? { backgroundColor: primaryColor } : {};
  const textStyle = { backgroundColor: `${primaryColor}4D` };

  return (
    <button className={css} onClick={onClick}>
      <div style={outerStyle}>
        <div style={innerStyle} />
      </div>
      <p className="c-form-choice-txt" style={textStyle}>
        {option}
      </p>
    </button>
  );
};

export default ({ options, title }: FormItemData) => {
  const [selectedOption, setSelectedOption] = useState('');
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const selectOption = (option: string) => {
    updateItem({ isActive: false, title, value: option });
    setSelectedOption(option);
  };

  return (
    <>
      {options.map((option) => (
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
