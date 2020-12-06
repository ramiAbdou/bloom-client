import { useEffect, useState } from 'react';

import { IdProps } from '@constants';
import { takeFirst } from '@util/util';
import { PickerAlign } from './Picker.store';

interface UsePickerPositionProps extends IdProps {
  initialAlign: PickerAlign;
  scrollId?: string;
}

type UsePickerPositionValue = { align: PickerAlign; left: number; top: number };

export default ({
  initialAlign,
  id,
  scrollId
}: UsePickerPositionProps): UsePickerPositionValue => {
  const element: HTMLElement = document.getElementById(id);
  const scrollElement: HTMLElement = document.getElementById(scrollId);
  const { left, top, width } = element?.getBoundingClientRect() ?? {};
  const { innerWidth } = window;

  const [align, setAlign] = useState<PickerAlign>(initialAlign);
  const [targetLeft, setTargetLeft] = useState(left);
  const [targetTop, setTargetTop] = useState(top);

  const onScroll = () => {
    const { left: updatedTargetLeft, top: updatedTargetTop } =
      element?.getBoundingClientRect() ?? {};

    if (updatedTargetLeft && updatedTargetLeft !== targetLeft) {
      const updatedAlign: PickerAlign = takeFirst([
        [
          align === 'BOTTOM_LEFT' &&
            innerWidth - (updatedTargetLeft + width) <= 240,
          'BOTTOM_RIGHT'
        ],
        [
          align === 'BOTTOM_RIGHT' &&
            innerWidth - (updatedTargetLeft + width) > 240,
          'BOTTOM_LEFT'
        ]
      ]);

      if (updatedAlign) setAlign(updatedAlign);
      setTargetLeft(updatedTargetLeft);
    }

    if (updatedTargetTop && updatedTargetTop !== targetTop) {
      setTargetTop(updatedTargetTop);
    }
  };

  useEffect(() => {
    if (scrollElement) scrollElement.addEventListener('scroll', onScroll);

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', onScroll);
      }
    };
  }, [scrollElement]);

  return { align, left: targetLeft, top: targetTop };
};
