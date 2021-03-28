import { action } from 'easy-peasy';

import { SidebarModel } from './Sidebar.types';

const navModel: SidebarModel = {
  isOpen: false,

  setIsOpen: action((state, isOpen: boolean) => {
    return { ...state, isOpen };
  })
};

export default navModel;
