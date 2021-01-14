import React from 'react';

import { ValueProps } from '@constants';

interface RadioOptionProps extends ValueProps {
  checked?: boolean;
  label: string;
  onClick: VoidFunction;
  name: string;
}

interface RadioProps extends ValueProps {
  name: string;
  onSelect?: (value: any) => any;
  options: Pick<RadioOptionProps, 'label' | 'value'>[];
}

const RadioOption = ({
  checked,
  label,
  onClick,
  value,
  name
}: RadioOptionProps) => {
  return (
    <div onClick={onClick}>
      <input
        checked={checked}
        id={value}
        name={name}
        type="radio"
        value={value}
      />

      <div>
        <span />
      </div>

      <label className="c-tag-attr" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

const Radio = ({
  name,
  onSelect,
  options,
  value: checkedValue
}: RadioProps) => {
  return (
    <div className="c-misc-radio">
      {options.map(
        ({ label, value }: Pick<RadioOptionProps, 'label' | 'value'>) => {
          return (
            <RadioOption
              key={value}
              checked={checkedValue === value}
              label={label}
              name={name}
              value={value}
              onClick={() => onSelect(value)}
            />
          );
        }
      )}
    </div>
  );
};

export default Radio;
