import { motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import Button from '@components/Button/Button';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { useStoreState } from '@store/Store';
import Home from '../../Home.store';

// Calling this dropdown even though it really drops up...lol.
const Dropdown = () => {
  const isDropdownOpen = Home.useStoreState((store) => store.isDropdownOpen);
  const toggleDropdown = Home.useStoreActions((store) => store.toggleDropdown);

  useLockBodyScroll();

  const onBgClick = () => toggleDropdown();

  return createPortal(
    <>
      {isDropdownOpen && (
        <>
          <div className="s-home-bb-dropdown-bg" onClick={onBgClick} />
          <motion.div
            key="s-home-bb-dropdown"
            animate={{ y: 0 }}
            className="s-home-bb-dropdown"
            initial={{ y: 10 }}
            transition={{ damping: 300 }}
          >
            HELLO
          </motion.div>
        </>
      )}
    </>,
    document.body
  );
};

export default () => {
  const logoUrl = useStoreState(({ db }) => db.community.logoUrl);
  const toggleDropdown = Home.useStoreActions((store) => store.toggleDropdown);

  return (
    <>
      <Button className="s-home-bb-link--community" onClick={toggleDropdown}>
        <img src={logoUrl} />
      </Button>

      <Dropdown />
    </>
  );
};
