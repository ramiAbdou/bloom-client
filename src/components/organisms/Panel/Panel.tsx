import { AnimatePresence, motion } from 'framer-motion';
import React, { CSSProperties, MutableRefObject, useRef } from 'react';
import { createPortal } from 'react-dom';
import useOnClickOutside from 'use-onclickoutside';

import { BaseProps, IdProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import usePanelPosition from './hooks/usePickerPosition';
import { PanelAlign } from './Panel.types';

export interface PanelProps extends BaseProps, IdProps {
  align?: PanelAlign;
  scrollId?: string;
  size?: 'md' | 'lg';
}

const PanelContent: React.FC<PanelProps> = ({
  align: initialAlign,
  className,
  children,
  id: panelId,
  scrollId,
  size,
  style
}) => {
  const id = useStoreState(({ panel }) => panel.id);
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const ref: MutableRefObject<HTMLDivElement> = useRef(null);
  const element: HTMLElement = document.getElementById(id);
  const { height, width } = element?.getBoundingClientRect() ?? {};
  const { innerHeight, innerWidth } = window;

  const position = usePanelPosition({ id: panelId, initialAlign, scrollId });
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
    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = element;

    if (
      clientX < offsetLeft ||
      clientX > offsetLeft + offsetWidth ||
      clientY < offsetTop ||
      clientY > offsetTop + offsetHeight
    ) {
      closePanel();
    }
  });

  if (!element || id !== panelId) return null;

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

  const css = cx('card c-panel', {
    'c-panel--lg': size === 'lg',
    [className]: className
  });

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

const Panel: React.FC<PanelProps> = ({ children, show, ...props }) => {
  const isPanelShowing = useStoreState(({ panel }) =>
    panel.isIdShowing(props.id)
  );

  if (show === false) return null;

  return createPortal(
    <AnimatePresence>
      {isPanelShowing && <PanelContent {...props}>{children}</PanelContent>}
    </AnimatePresence>,
    document.body
  );
};

export default Panel;
