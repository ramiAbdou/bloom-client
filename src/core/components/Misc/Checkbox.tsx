import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

import { ClassNameProps, OnClickProps } from '@constants';
import { makeClass } from '@util/util';

interface CheckboxProps extends ClassNameProps, OnClickProps {
  selected?: boolean;
}

export default ({ className, selected, onClick }: CheckboxProps) => {
  const onClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (onClick) onClick();
  };

  const css = makeClass([
    'c-misc-checkbox',
    [selected, 'c-misc-checkbox--active'],
    className
  ]);

  return (
    <div className={css} onClick={onClickHandler}>
      {selected && <IoCheckmark color="#FFF" />}
    </div>
  );
};
