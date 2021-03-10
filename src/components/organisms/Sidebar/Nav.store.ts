import { action } from 'easy-peasy';

import { NavModel } from './Nav.types';

const navModel: NavModel = {
  isOpen: false,
  setIsOpen: action((state, isOpen: boolean) => ({ ...state, isOpen }))
};

export default navModel;
