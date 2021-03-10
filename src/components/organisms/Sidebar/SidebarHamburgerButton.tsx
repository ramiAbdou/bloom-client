import React from 'react';
import { IoMenuOutline } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';

const SidebarHamburgerButton: React.FC = () => {
  const setIsOpen = useStoreActions(({ sidebar }) => sidebar.setIsOpen);

  const onClick = () => setIsOpen(true);

  return (
    <div className="d-none--d mb-sm">
      <Button onClick={onClick}>
        <IoMenuOutline className="react-icon--lg" />
      </Button>
    </div>
  );
};

export default SidebarHamburgerButton;
