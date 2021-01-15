import React from 'react';

import { RadioOptionProps, RadioProps } from './Radio.types';
import RadioOptionCard from './RadioOptionCard';

const RadioOption: React.FC<RadioOptionProps> = ({
  checked,
  label,
  onSelect,
  name
}) => {
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked) onSelect(label);
  };

  return (
    <div>
      <input
        checked={checked}
        id={label}
        name={name}
        type="radio"
        value={label}
        onChange={onChange}
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
