/**
 * @fileoverview Component: MultiButton
 * @author Rami Abdou
 */

import React, { useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import { ButtonProps } from './Button';
import OutlineButton from './OutlineButton';
import PrimaryButton from './PrimaryButton';

interface MultiButtonProps extends ButtonProps {
  options: { onClick: Function; title: string }[];
}

export default ({ className, options }: MultiButtonProps) => {
  const [activeTitle, setActiveTitle] = useState(options[0].title);

  return (
    <div>
      {options.map(({ title, ...props }) =>
        title === activeTitle ? (
          <PrimaryButton key={title} title={title} {...props} />
        ) : (
          <OutlineButton key={title} title={title} {...props} />
        )
      )}
    </div>
  );
};
