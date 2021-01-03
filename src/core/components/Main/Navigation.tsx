import React from 'react';

import {
  ChildrenProps,
  IsActiveProps,
  OnClickProps,
  TitleProps
} from '@constants';
import { makeClass } from '@util/util';

export interface NavigationOptionProps
  extends ChildrenProps,
    OnClickProps,
    TitleProps {}

export interface NavigationProps {
  activeIndex?: number;
  options?: NavigationOptionProps[];
}

interface NavigationButtonProps
  extends Pick<NavigationOptionProps, 'children'>,
    IsActiveProps {
  onClick: VoidFunction;
}

const NavigationButton = ({
  children,
  isActive,
  onClick
}: NavigationButtonProps) => {
  const css = makeClass(['c-main-multi', [isActive, 'c-main-multi--active']]);

  return (
    <button className={css} onClick={onClick}>
      {children}
    </button>
  );
};

export default ({ activeIndex, options }: NavigationProps) => {
  if (activeIndex === null || !options?.length) return null;

  const activeOption: NavigationOptionProps = options[activeIndex];

  return (
    <nav className="c-main-multi-ctr">
      {options.map(({ title, onClick }: NavigationOptionProps, i: number) => {
        const onButtonClick = () => {
          if (onClick) onClick();
          activeIndex = i;
        };

        return (
          <NavigationButton
            key={title}
            isActive={activeOption.title === title}
            onClick={onButtonClick}
          >
            {title}
          </NavigationButton>
        );
      })}
    </nav>
  );
};
