import deepequal from 'fast-deep-equal';
import { motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';
import { IoCheckmarkCircle } from 'react-icons/io5';

import Button from '@atoms/Button';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { ICommunity } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import Home from './BottomBar.store';

const CommunitySelector = ({ id, logoUrl, name }: Partial<ICommunity>) => {
  const isActive = useStoreState(({ db }) => db.community.name === name);

  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);

  const toggleDropdown = Home.useStoreActions((store) => store.toggleDropdown);

  const onClick = () => {
    setActiveCommunity(id);
    setTimeout(toggleDropdown, 0);
  };

  const css = makeClass([
    'o-bottom-bar-dropdown-link',
    [isActive, 'o-bottom-bar-dropdown-link--active']
  ]);

  return (
    <div className={css}>
      <Button onClick={onClick}>
        <img alt="Community Logo" src={logoUrl} />
        <h3>{name}</h3>
      </Button>

      {isActive && <IoCheckmarkCircle />}
    </div>
  );
};

// Calling this dropdown even though it really drops up...lol.
const Dropdown = () => {
  const communities = useStoreState(({ db }) => {
    const { allIds, byId } = db.entities.communities;
    return allIds.map((id: string) => byId[id]);
  }, deepequal) as ICommunity[];

  const toggleDropdown = Home.useStoreActions((store) => store.toggleDropdown);

  useLockBodyScroll();

  const onBgClick = () => toggleDropdown();

  return createPortal(
    <>
      <div className="o-bottom-bar-dropdown-bg" onClick={onBgClick} />
      <motion.div
        key="o-bottom-bar-dropdown"
        // animate={{ y: 0 }}
        className="o-bottom-bar-dropdown"
        // initial={{ y: 10 }}
      >
        {communities.map((props: ICommunity) => (
          <CommunitySelector key={props.id} {...props} />
        ))}
      </motion.div>
    </>,
    document.body
  );
};

export default () => {
  const logoUrl = useStoreState(({ db }) => db.community.logoUrl);
  const toggleDropdown = Home.useStoreActions((store) => store.toggleDropdown);
  const isDropdownOpen = Home.useStoreState((store) => store.isDropdownOpen);

  return (
    <>
      <Button
        className="o-bottom-bar-link--community"
        onClick={() => toggleDropdown()}
      >
        <img src={logoUrl} />
      </Button>

      {isDropdownOpen && <Dropdown />}
    </>
  );
};
