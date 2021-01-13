import { Action, action, createContextStore } from 'easy-peasy';

type BottomBarModel = {
  isDropdownOpen: boolean;
  toggleDropdown: Action<BottomBarModel>;
};

const BottomBarStore = createContextStore<BottomBarModel>(
  {
    isDropdownOpen: false,

    toggleDropdown: action(({ isDropdownOpen, ...state }) => ({
      isDropdownOpen: !isDropdownOpen,
      ...state
    }))
  },
  { disableImmer: true }
);

export default BottomBarStore;
