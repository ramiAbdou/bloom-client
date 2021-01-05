import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import { FC } from 'react';

import { OnClickProps } from '@constants';

export interface LinkOptions extends OnClickProps {
  Icon: FC;
  to?: string;
  title: string;
}

type NavModel = {
  activeTo: string; // Represents the "to" that is active.
  isActive: Computed<NavModel, (to: string) => boolean, {}>;
  isDropdownOpen: boolean;
  setActiveTo: Action<NavModel, string>;
  toggleDropdown: Action<NavModel>;
};

const model: NavModel = {
  activeTo: null,

  isActive: computed(({ activeTo }) => (to: string) => activeTo === to),

  isDropdownOpen: false,

  setActiveTo: action((state, activeTo: string) => ({ ...state, activeTo })),

  toggleDropdown: action(({ isDropdownOpen, ...state }) => ({
    isDropdownOpen: !isDropdownOpen,
    ...state
  }))
};

const NavStore = createContextStore<NavModel>(model, { disableImmer: true });

export default NavStore;
