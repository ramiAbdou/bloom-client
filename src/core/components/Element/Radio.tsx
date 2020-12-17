import React from 'react';

type RadioOptionProps = {
  defaultChecked?: boolean;
  label: string;
  onClick: VoidFunction;
  name: string;
  value: any;
};

type RadioProps = {
  initialChecked?: string;
  name: string;
  onSelect?: (value: any) => any;
  options: Pick<RadioOptionProps, 'label' | 'value'>[];
};

const RadioOption = ({ label, onClick, value, ...props }: RadioOptionProps) => {
  return (
    <div onClick={onClick}>
      <input id={value} type="radio" value={value} {...props} />
      <div>
        <span />
      </div>
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default ({ initialChecked, name, onSelect, options }: RadioProps) => (
  <div className="c-misc-radio">
    {options.map(
      ({ label, value }: Pick<RadioOptionProps, 'label' | 'value'>) => (
        <RadioOption
          key={value}
          defaultChecked={initialChecked === value}
          label={label}
          name={name}
          value={value}
          onClick={() => onSelect(value)}
        />
      )
    )}
  </div>
);
