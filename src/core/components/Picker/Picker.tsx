import { AnimatePresence, motion } from 'framer-motion';
import React, {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';
import useOnClickOutside from 'use-onclickoutside';

import { ChildrenProps, ClassNameProps, IdProps, StyleProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';

interface PickerProps
  extends ChildrenProps,
    IdProps,
    ClassNameProps,
    StyleProps {
  align?: 'RIGHT_BOTTOM' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';
}

const Picker = ({
  align,
  className,
  children,
  id: PICKER_ID,
  style
}: PickerProps) => {
  const id = useStoreState(({ picker }) => picker.id);
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const ref: MutableRefObject<HTMLDivElement> = useRef(null);
  const element: HTMLElement = document.getElementById(id);

  // If the click happened within the element that was used to open the
  // Picker, then we don't close the picker.
  useOnClickOutside(ref, (event) => {
    // If the element doesn't exist, then just close the picker.
    if (!element) {
      closePicker();
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
      closePicker();
    }
  });

  useEffect(() => {}, []);

  if (!element || id !== PICKER_ID) return null;

  // ## START: CALCULATE PICKER COORDINATES AND ANIMATION STYLING

  let positionStyle: Partial<CSSProperties> = {};
  let exit: any = {};
  let initial: any = { opacity: 0.5 };
  let animate: any = { opacity: 1 };

  const { innerHeight, innerWidth } = window;
  const { left, top, height, width } = element.getBoundingClientRect();

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

  // ## END: CALCULATE PICKER COORDINATES

  const css = makeClass(['c-picker', [className, className]]);

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

export default ({ children, ...props }: PickerProps) => {
  const isPickerShowing = useStoreState(({ picker }) =>
    picker.isIdShowing(props.id)
  );

  return createPortal(
    <AnimatePresence>
      {isPickerShowing && <Picker {...props}>{children}</Picker>}
    </AnimatePresence>,
    document.body
  );
};
