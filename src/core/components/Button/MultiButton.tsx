import React from 'react';

import { makeClass } from '@util/util';
import Button from './Button';

interface MultiButtonProps {
  activeIndex?: number;
  options: { onClick: Function; title: string }[];
}

export default ({ activeIndex, options }: MultiButtonProps) => (
  <div className="c-btn-multi-ctr">
    {options.map(({ title, onClick }, i: number) => {
      const css = makeClass([
        'c-btn-multi',
        [options[activeIndex].title === title, 'c-btn-multi--active']
      ]);

      const onButtonClick = () => {
        if (onClick) onClick();
        activeIndex = i;
      };

      return (
        <Button
          key={title}
          className={css}
          title={title}
          onClick={onButtonClick}
        />
      );
    })}
  </div>
);
