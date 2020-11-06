/**
 * @fileoverview Store: Screen
 * @author Rami Abdou
 */

import { Action, action, Computed, computed } from 'easy-peasy';

type Breakpoint = 'D' | 'T' | 'M';

export type ScreenModel = {
  breakpoint: Computed<ScreenModel, Breakpoint>;
  isMobile: Computed<ScreenModel, boolean>;
  isDesktop: Computed<ScreenModel, boolean>;
  setWindowWidth: Action<ScreenModel, number>;
  widthRatio: Computed<ScreenModel, number>;
  windowWidth: number;
};

export const screenModel: ScreenModel = {
  breakpoint: computed(({ windowWidth }) => {
    if (windowWidth > 1025) return 'D';
    if (windowWidth <= 1024 && windowWidth >= 576) return 'T';
    return 'M';
  }),
  isDesktop: computed(({ breakpoint }) => breakpoint === 'D'),
  isMobile: computed(({ breakpoint }) => breakpoint === 'M'),
  setWindowWidth: action((state, width: number) => ({ ...state, width })),
  widthRatio: computed(({ windowWidth }) => windowWidth / 1440),
  windowWidth: window.innerWidth
};
