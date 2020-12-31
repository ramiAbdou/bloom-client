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

type HomeModel = {
  activeTo: string; // Represents the "to" that is active.
  isActive: Computed<HomeModel, (to: string) => boolean, {}>;
  isDropdownOpen: boolean;
  setActiveTo: Action<HomeModel, string>;
  toggleDropdown: Action<HomeModel>;
};

const model: HomeModel = {
  activeTo: null,

  isActive: computed(({ activeTo }) => (to: string) => activeTo === to),

  isDropdownOpen: false,

  setActiveTo: action((state, activeTo: string) => ({ ...state, activeTo })),

  toggleDropdown: action(({ isDropdownOpen, ...state }) => ({
    isDropdownOpen: !isDropdownOpen,
    ...state
  }))
};

export default createContextStore<HomeModel>(model);
