import { Action, action } from 'easy-peasy';

export interface NavModel {
  isOpen: boolean;
  setIsOpen: Action<NavModel, boolean>;
}

const navModel: NavModel = {
  isOpen: false,
  setIsOpen: action((state, isOpen) => ({ ...state, isOpen }))
};

export default navModel;
