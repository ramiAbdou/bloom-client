import React from 'react';

import { cx } from '@util/util';

export interface MainNavigationOptionProps {
  onClick: VoidFunction;
  pathname: string;
  title: string;
}

interface MainNavigationButtonProps extends MainNavigationOptionProps {
  activeTitle: string;
}

const MainNavigationButton: React.FC<MainNavigationButtonProps> = (props) => {
  const { activeTitle, onClick, title } = props;

  const active: boolean = activeTitle === title;
  const css: string = cx('t-main-nav', { 't-main-nav--active': active });

  return (
    <button className={css} onClick={onClick && onClick}>
      {title}
    </button>
  );
};

export default MainNavigationButton;
