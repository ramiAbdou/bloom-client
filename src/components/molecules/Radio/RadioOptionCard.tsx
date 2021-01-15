import React from 'react';

import Card from '@containers/Card/Card';
import { cx } from '@util/util';
import { RadioOptionProps } from './Radio.types';

const RadioOptionCard: React.FC<RadioOptionProps> = ({
  checked,
  children,
  description,
  label,
  name,
  onSelect
}) => {
  const onClick = () => onSelect(label);

  const css = cx({
    'c-misc-radio-option-card': true,
    'c-misc-radio-option-card--active': checked
  });

  return (
    <Card className={css} onClick={onClick}>
      <div>
        <input
          readOnly
          checked={checked}
          id={label}
          name={name}
          type="radio"
          value={label}
        />

        <div>
          <span />
        </div>
      </div>

      <div>
        {label && <h4>{label}</h4>}
        {children}
        {description && <p>{description}</p>}
      </div>
    </Card>
  );
};

export default RadioOptionCard;
