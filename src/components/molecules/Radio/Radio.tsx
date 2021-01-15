import React from 'react';

import { RadioOptionProps, RadioProps } from './Radio.types';
import RadioOptionCard from './RadioOptionCard';

const RadioOption: React.FC<RadioOptionProps> = ({
  checked,
  label,
  onSelect,
  name
}) => {
  const onClick = () => onSelect(label);

  return (
    <div onClick={onClick}>
      <input
        checked={checked}
        id={label}
        name={name}
        type="radio"
        value={label}
      />

      <div>
        <span />
      </div>

      <label className="c-tag-attr" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

const Radio: React.FC<RadioProps> = ({
  card,
  options,
  value: checkedValue,
  ...radioProps
}) => {
  return (
    <div className="c-misc-radio">
      {options.map((optionProps: RadioOptionProps) => {
        const allProps = {
          ...optionProps,
          ...radioProps,
          checked: checkedValue === optionProps.label,
          key: optionProps.label
        };

        if (card) return <RadioOptionCard {...allProps} />;
        return <RadioOption {...allProps} />;
      })}
    </div>
  );
};

export default Radio;
