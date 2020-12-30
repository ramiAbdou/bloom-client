import React from 'react';

import useSelectOption from '../hooks/useSelectOption';

type OptionProps = { option: string };

export default function Option({ option }: OptionProps) {
  const selectOption = useSelectOption(option);

  return (
    <button
      className="c-misc-dropdown-option"
      type="button"
      onClick={selectOption}
    >
      <p>{option}</p>
    </button>
  );
}
