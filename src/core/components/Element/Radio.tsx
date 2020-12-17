import React from 'react';

type RadioOptionProps = { label: string; value: any };

type RadioProps = {
  initialChecked?: string;
  name: string;
  onSelect?: (value: any) => any;
  options: RadioOptionProps[];
};

export default ({ initialChecked, name, onSelect, options }: RadioProps) => {
  const onClick = (value: any) => onSelect(value);

  return (
    <div className="c-misc-radio">
      {options.map(({ label, value }) => (
        <div key={value} onClick={() => onClick(value)}>
          <input
            defaultChecked={initialChecked === value}
            id={value}
            name={name}
            type="radio"
            value={value}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
    </div>
  );
};
