/**
 * @fileoverview Component: MultiButton
 * @author Rami Abdou
 */

import React from 'react';

import CSSModifier from '@util/CSSModifier';
import Button, { ButtonProps } from './Button';

interface MultiButtonProps extends ButtonProps {
  activeIndex?: number;
  options: { onClick: Function; title: string }[];
}

export default ({ activeIndex, options }: MultiButtonProps) => (
  <div>
    {options.map(({ title, onClick }, i: number) => {
      const { css } = new CSSModifier()
        .class('c-btn-multi')
        .addClass(options[activeIndex].title === title, 'c-btn-multi--active');

      const onClickButton = () => {
        if (onClick) onClick();
        activeIndex = i;
      };

      return (
        <Button
          key={title}
          noScale
          className={css}
          title={title}
          onClick={onClickButton}
        />
      );
    })}
  </div>
);
