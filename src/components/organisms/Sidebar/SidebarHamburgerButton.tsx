import React from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { isSidebarOpenVar } from 'src/App.reactive';

import Button from '@components/atoms/Button/Button';
import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

const SidebarHamburgerButton: React.FC<BaseProps> = ({ className }) => {
  const onClick = (): void => {
    isSidebarOpenVar(true);
  };

  const css: string = cx('d-none--d mb-sm', {}, className);

  return (
    <div className={css}>
      <Button onClick={onClick}>
        <IoMenuOutline className="react-icon--lg" />
      </Button>
    </div>
  );
};

export default SidebarHamburgerButton;
