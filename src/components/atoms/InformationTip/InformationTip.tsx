import React from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

import useTooltip, { TooltipPosition } from '@hooks/useTooltip';

type InformationTipProps = { position?: TooltipPosition; tooltip: string };

const InformationTip: React.FC<InformationTipProps> = ({
  position,
  tooltip
}) => {
  const ref: React.MutableRefObject<HTMLDivElement> = useTooltip(
    tooltip,
    position ?? 'middle'
  );

  return (
    <div ref={ref} className="c-misc-tip">
      <IoInformationCircleOutline />
    </div>
  );
};

export default InformationTip;
