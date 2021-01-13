import { MutableRefObject, useEffect, useRef } from 'react';

export type TooltipPosition = 'left' | 'middle' | 'right';

export default (
  tooltip: string,
  position: TooltipPosition = 'middle'
): MutableRefObject<HTMLElement> => {
  const ref: MutableRefObject<HTMLElement> = useRef(null);

  useEffect(() => {
    const element = ref?.current;

    // Will return if there either is not an element, or that element already
    // has the tooltip attribute. Ensures that it doesn't update every time.
    if (!element || element.hasAttribute('tooltip')) return;

    element.setAttribute('tooltip', tooltip);
    element.classList.add('tooltip');

    if (position === 'middle') {
      element.classList.add('tooltip--middle');
    } else if (position === 'right') element.classList.add('tooltip--right');
    else if (position === 'left') element.classList.add('tooltip--left');
  }, [ref]);

  return ref;
};
