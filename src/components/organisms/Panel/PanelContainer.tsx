import { motion } from 'framer-motion';
import React, { CSSProperties, MutableRefObject, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import usePanelPosition from './usePanelPosition';

const PanelContainer: React.FC = ({ children }) => {
  const initialAlign = useStoreState(({ panel }) => panel.align);
  const className = useStoreState(({ panel }) => panel.className);
  const id = useStoreState(({ panel }) => panel.id);
  const metadata = useStoreState(({ panel }) => panel.metadata);
  const scrollId = useStoreState(({ panel }) => panel.scrollId);
  const size = useStoreState(({ panel }) => panel.size);
  const style = useStoreState(({ panel }) => panel.style);
  const useMetadataInId = useStoreState(({ panel }) => panel.useMetadataInId);
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const elementId = useMetadataInId ? `${id}-${metadata}` : id;

  const ref: MutableRefObject<HTMLDivElement> = useRef(null);
  const element: HTMLElement = document.getElementById(elementId);
  const { height, width } = element?.getBoundingClientRect() ?? {};
  const { innerHeight, innerWidth } = window;

  const position = usePanelPosition({ id: elementId, initialAlign, scrollId });
  const { align, left, top } = position;

  // If the click happened within the element that was used to open the
  // Picker, then we don't close the panel.
  useOnClickOutside(ref, (event) => {
    // If the element doesn't exist, then just close the panel.
    if (!element) {
      closePanel();
      return;
    }

    // @ts-ignore b/c we know that clientX and clientY exist on the HTML Event.
    const { clientX, clientY } = event;
    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = ref?.current;

    if (
      clientX < offsetLeft ||
      clientX > offsetLeft + offsetWidth ||
      clientY < offsetTop ||
      clientY > offsetTop + offsetHeight
    ) {
      closePanel();
    }
  });

  if (!element) return null;

  // ## START: CALCULATE PICKER COORDINATES AND ANIMATION STYLING

  let positionStyle: Partial<CSSProperties> = {};
  let exit: any = {};
  let initial: any = { opacity: 0.5 };
  let animate: any = { opacity: 1 };

  // ## CASE #1: RIGHT_BOTTOM

  if (align === 'RIGHT_BOTTOM') {
    positionStyle = {
      bottom: innerHeight - (top + height),
      left: left + width + 8
    };

    initial = { ...initial, x: -10 };
    exit = { ...exit, x: 10 };
    animate = { ...animate, x: 0 };
  }

  // ## CASE #2: BOTTOM_LEFT

  if (align === 'BOTTOM_LEFT') {
    positionStyle = { left, top: top + height + 8 };
    initial = { ...initial, y: -10 };
    exit = { ...exit, y: 10 };
    animate = { ...animate, y: 0 };
  }

  // ## CASE #3: BOTTOM_RIGHT

  if (align === 'BOTTOM_RIGHT') {
    positionStyle = {
      right: innerWidth - (left + width),
      top: top + height + 8
    };

    initial = { ...initial, y: -10 };
    exit = { ...exit, y: 10 };
    animate = { ...animate, y: 0 };
  }

  // ## CASE #4: TOP_LEFT

  if (align === 'TOP_LEFT') {
    positionStyle = {
      left: left + width + 8,
      top: top + height + 8
    };

    initial = { ...initial, y: 10 };
    exit = { ...exit, y: 10 };
    animate = { ...animate, y: 0 };
  }

  // ## END: CALCULATE PICKER COORDINATES

  const css: string = cx(
    'card c-panel',
    { 'c-panel--lg': size === 'lg' },
    className
  );

  return (
    <motion.div
      ref={ref}
      animate={animate}
      className={css}
      exit={exit}
      initial={initial}
      style={{ ...positionStyle, ...style }}
    >
      {children}
    </motion.div>
  );
};

export default PanelContainer;
