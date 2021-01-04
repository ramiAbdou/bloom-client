import React from 'react';
import { useHistory } from 'react-router-dom';

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
    TitleProps {
  pathname: string;
}

export interface NavigationProps {
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
  const css = makeClass(['t-main-multi', [isActive, 't-main-multi--active']]);

  return (
    <button className={css} onClick={onClick}>
      {children}
    </button>
  );
};

const HeaderNavigation: React.FC<NavigationProps> = ({ options }) => {
  const { location } = useHistory();
  const { pathname } = location;

  // Only show if options are present.
  if (!options?.length) return null;

  const page = pathname.substring(pathname.lastIndexOf('/') + 1);
  const activeIndex = options.findIndex((option) => option.pathname === page);

  if (activeIndex < 0 || !options?.length) return null;

  const activeOption: NavigationOptionProps = options[activeIndex];

  return (
    <nav className="t-main-multi-ctr">
      {options.map(({ title, onClick }: NavigationOptionProps) => {
        const onButtonClick = () => onClick && onClick();

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

export default HeaderNavigation;
