import React from 'react';
import { IoMenuOutline } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

const SidebarHamburgerButton: React.FC<BaseProps> = ({ className }) => {
  const setIsOpen = useStoreActions(({ sidebar }) => sidebar.setIsOpen);
  const onClick = () => setIsOpen(true);
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
