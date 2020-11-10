/**
 * @fileoverview Store: Tooltip
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import { MutableRefObject } from 'react';

type ShowTooltipArgs = { ref: MutableRefObject<any>; value: string };

export type TooltipModel = {
  clearTooltip: Action<TooltipModel>;
  ref: MutableRefObject<any>;
  showTooltip: Action<TooltipModel, ShowTooltipArgs>;
  value: string;
};

export const tooltipModel: TooltipModel = {
  clearTooltip: action((state) => ({ ...state, ref: null })),

  ref: null,

  showTooltip: action((state, { ref, value }: ShowTooltipArgs) => ({
    ...state,
    ref,
    value
  })),

  value: ''
};
