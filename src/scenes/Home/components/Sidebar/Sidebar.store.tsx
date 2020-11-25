/**
 * @fileoverview Store: Sidebar
 * @author Rami Abdou
 */

import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

export type LinkOptions = { to: string; title: string };

type SidebarModel = {
  activeTo: string; // Represents the "to" that is active.
  isActive: Computed<SidebarModel, (to: string) => boolean, {}>;
  setActiveTo: Action<SidebarModel, string>;
};

export default createContextStore<SidebarModel>(
  (initialActiveTo: string) => ({
    activeTo: initialActiveTo,

    isActive: computed(({ activeTo }) => (to: string) => activeTo === to),

    setActiveTo: action((state, activeTo: string) => ({ ...state, activeTo }))
  }),
  { disableImmer: true }
);
