import { useEffect, useState } from 'react';

import { IdProps } from '@util/constants';
import { take } from '@util/util';
import { PanelAlign } from './Panel.types';

interface UsePanelPositionProps extends IdProps {
  initialAlign: PanelAlign;
  scrollId?: string;
}

type UsePanelPositionResult = { align: PanelAlign; left: number; top: number };

const usePanelPosition = ({
  initialAlign,
  id,
  scrollId
}: UsePanelPositionProps): UsePanelPositionResult => {
  const element: HTMLElement = document.getElementById(id);
  const scrollElement: HTMLElement = document.getElementById(scrollId);
  const { left, top, width } = element?.getBoundingClientRect() ?? {};
  const { innerWidth } = window;

  const [align, setAlign] = useState<PanelAlign>(initialAlign);
  const [targetLeft, setTargetLeft] = useState(left);
  const [targetTop, setTargetTop] = useState(top);

  const updatePosition = () => {
    const { left: updatedTargetLeft, top: updatedTargetTop } =
      element?.getBoundingClientRect() ?? {};

    const updatedAlign: PanelAlign = take([
      [
        align === 'BOTTOM_LEFT' && innerWidth - updatedTargetLeft <= 300,
        'BOTTOM_RIGHT'
      ],
      [
        align === 'BOTTOM_RIGHT' &&
          innerWidth - (updatedTargetLeft + width) > 300,
        'BOTTOM_LEFT'
      ]
    ]);

    if (updatedAlign) setAlign(updatedAlign);

    if (updatedTargetLeft && updatedTargetLeft !== targetLeft) {
      setTargetLeft(updatedTargetLeft);
    }

    if (updatedTargetTop && updatedTargetTop !== targetTop) {
      setTargetTop(updatedTargetTop);
    }
  };

  useEffect(() => {
    updatePosition();
  }, [initialAlign]);

  useEffect(() => {
    if (scrollElement) scrollElement.addEventListener('scroll', updatePosition);

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', updatePosition);
      }
    };
  }, [scrollElement]);

  return { align, left: targetLeft, top: targetTop };
};

export default usePanelPosition;
