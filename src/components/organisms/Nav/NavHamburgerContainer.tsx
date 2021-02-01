import React from 'react';
import { IoMenuOutline } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';

const NavHamburgerContainer: React.FC = () => {
  const setIsOpen = useStoreActions(({ nav }) => nav.setIsOpen);
  const onClick = () => setIsOpen(true);

  return (
    <div className="o-nav-hamburger">
      <Button onClick={onClick}>
        <IoMenuOutline />
      </Button>
    </div>
  );
};

export default NavHamburgerContainer;
