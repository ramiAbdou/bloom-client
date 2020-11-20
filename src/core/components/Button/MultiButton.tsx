/**
 * @fileoverview Component: MultiButton
 * @author Rami Abdou
 */

import React, { useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import Button, { ButtonProps } from './Button';

interface MultiButtonProps extends ButtonProps {
  options: { onClick: Function; title: string }[];
}

export default ({ options }: MultiButtonProps) => {
  const [activeTitle, setActiveTitle] = useState(options[0].title);

  return (
    <div>
      {options.map(({ title, onClick }) => {
        const { css } = new CSSModifier()
          .class('c-btn-multi')
          .addClass(activeTitle === title, 'c-btn-multi--active');

        const onClickButton = () => {
          if (onClick) onClick();
          setActiveTitle(title);
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
};
