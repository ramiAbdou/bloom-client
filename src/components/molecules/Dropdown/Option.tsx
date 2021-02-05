import React from 'react';

import useSelectOption from './useSelectOption';

type OptionProps = { option: string };

export default function Option({ option }: OptionProps) {
  const selectOption = useSelectOption(option);

  return (
    <button className="o-dropdown-option" type="button" onClick={selectOption}>
      <p>{option}</p>
    </button>
  );
}
