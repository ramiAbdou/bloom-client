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

type SidebarModel = {
  activeTo: string; // Represents the "to" that is active.
  isActive: Computed<SidebarModel, (to: string) => boolean, {}>;
  setActiveTo: Action<SidebarModel, string>;
};

const model: SidebarModel = {
  activeTo: null,

  isActive: computed(({ activeTo }) => (to: string) => activeTo === to),

  setActiveTo: action((state, activeTo: string) => ({ ...state, activeTo }))
};

export default createContextStore<SidebarModel>(model, { disableImmer: true });
