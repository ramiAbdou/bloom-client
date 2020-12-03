import React, { useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';

import { ClassNameProps, OnClickProps } from '@constants';
import { makeClass } from '@util/util';

interface CheckboxProps extends ClassNameProps, OnClickProps {
  selected?: boolean;
}

export default ({ className, selected, onClick }: CheckboxProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickCheckbox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (onClick) onClick();
    else setIsSelected(!isSelected);
  };

  const css = makeClass([
    'c-misc-checkbox',
    [selected || isSelected, 'c-misc-checkbox--active'],
    className
  ]);

  return (
    <div className={css} onClick={onClickCheckbox}>
      {(selected || isSelected) && <IoCheckmark color="#FFF" />}
    </div>
  );
};
