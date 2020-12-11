import { AnimatePresence, motion } from 'framer-motion';
import React, { CSSProperties, MutableRefObject, useRef } from 'react';
import { createPortal } from 'react-dom';
import useOnClickOutside from 'use-onclickoutside';

import { ChildrenProps, ClassNameProps, IdProps, StyleProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import { PickerAlign } from './Picker.store';
import usePickerPosition from './usePickerPosition';

interface PickerProps
  extends ChildrenProps,
    IdProps,
    ClassNameProps,
    StyleProps {
  align?: PickerAlign;
  scrollId?: string;
}

const Picker = ({
  align: initialAlign,
  className,
  children,
  id: PICKER_ID,
  scrollId,
  style
}: PickerProps) => {
  const id = useStoreState(({ picker }) => picker.id);
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const ref: MutableRefObject<HTMLDivElement> = useRef(null);
  const element: HTMLElement = document.getElementById(id);
  const { height, width } = element?.getBoundingClientRect() ?? {};
  const { innerHeight, innerWidth } = window;

  const position = usePickerPosition({ id: PICKER_ID, initialAlign, scrollId });
  const { align, left, top } = position;

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

  if (!element || id !== PICKER_ID) return null;

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

  console.log(positionStyle);

  // ## END: CALCULATE PICKER COORDINATES

  const css = makeClass(['card', 'c-picker', [className, className]]);

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
