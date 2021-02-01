import React from 'react';
import { IoMenuOutline } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Show from '@containers/Show';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreActions } from '@store/Store';

const NavHamburgerContainer: React.FC = () => {
  const isDesktop = useBreakpoint() >= 3;
  const setIsOpen = useStoreActions(({ nav }) => nav.setIsOpen);
  const onClick = () => setIsOpen(true);

  return (
    <Show show={!isDesktop}>
      <div className="o-nav-hamburger">
        <Button onClick={onClick}>
          <IoMenuOutline />
        </Button>
      </div>
    </Show>
  );
};

export default NavHamburgerContainer;
