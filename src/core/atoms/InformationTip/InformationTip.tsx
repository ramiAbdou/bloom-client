import React from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

import useTooltip, { TooltipPosition } from '@hooks/useTooltip';

type InformationTipProps = { position?: TooltipPosition; tooltip: string };

const InformationTip = ({ position, tooltip }: InformationTipProps) => {
  const ref = useTooltip(tooltip, position ?? 'middle');

  return (
    // @ts-ignore until we figure out the write type.
    <div ref={ref} className="c-misc-tip">
      <IoInformationCircleOutline />
    </div>
  );
};

export default InformationTip;
