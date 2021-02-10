import React from 'react';
import { useHistory } from 'react-router-dom';

import { OnClickProps, TitleProps } from '@constants';
import { cx } from '@util/util';

export interface NavigationOptionProps extends OnClickProps, TitleProps {
  pathname: string;
}

export interface NavigationProps {
  options?: NavigationOptionProps[];
}

interface NavigationButtonProps {
  active?: boolean;
  onClick: VoidFunction;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  active,
  children,
  onClick
}) => {
  const css = cx('t-main-multi', { 't-main-multi--active': active });

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
            active={activeOption.title === title}
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
