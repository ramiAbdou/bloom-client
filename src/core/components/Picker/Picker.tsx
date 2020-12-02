/**
 * @fileoverview Component: Picker
 * - Modal-like component that executes different actions based on the options.
 * This is similar to the Flow component, except there is only a singular
 * screen.
 * @author Rami Abdou
 */

import './Picker.scss';

import { AnimatePresence, motion } from 'framer-motion';
import React, {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ChildrenProps, ClassNameProps, IdProps, StyleProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';

interface PickerProps
  extends ChildrenProps,
    IdProps,
    ClassNameProps,
    StyleProps {
  align?: 'RIGHT_BOTTOM' | 'BOTTOM_LEFT';
}

export default ({
  align,
  className,
  children,
  id: PICKER_ID,
  style
}: PickerProps) => {
  // const coordinates = useStoreState(({ picker }) => picker.coordinates);
  const id = useStoreState(({ picker }) => picker.id);
  const isShowing = useStoreState(({ picker }) => picker.isShowing);
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const element: HTMLElement = document.getElementById(id);
  const ref: MutableRefObject<HTMLDivElement> = useRef(null);

  const shouldShowPicker = useMemo(() => isShowing && PICKER_ID === id, [
    isShowing,
    id === PICKER_ID
  ]);

  // If the click happened within the element that was used to open the
  // Picker, then we don't close the picker.
  useOnClickOutside(ref, (event) => {
    if (!shouldShowPicker) return;

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
    )
      closePicker();
  });

  useEffect(() => {}, [window.innerWidth]);

  if (!shouldShowPicker || !element) return null;

  // ## START: CALCULATE PICKER COORDINATES AND ANIMATION STYLING

  let positionStyle: Partial<CSSProperties> = {};
  let exit: any = {};
  let initial: any = { opacity: 0 };
  let animate: any = { opacity: 1 };

  const { innerHeight } = window;
  const { left, top, height, width } = element.getBoundingClientRect();

  // ## CASE #1: RIGHT_BOTTOM - Left is going to be the element's left +
  // element width. Bottom is going to be the element's bottom.

  if (align === 'RIGHT_BOTTOM') {
    const leftWithWidth = left + width;
    const updatedBottom = innerHeight - (top + height);
    positionStyle = { bottom: updatedBottom, left: leftWithWidth + 12 };
    initial = { ...initial, x: -10 };
    exit = { ...exit, x: 10 };
    animate = { ...animate, x: 0 };
  }

  // ## CASE #2: BOTTOM_LEFT - Left is going to be the element's left +
  // element width. Bottom is going to be the element's bottom.

  if (align === 'BOTTOM_LEFT') {
    positionStyle = { left, top: top + height + 12 };
    initial = { ...initial, y: -10 };
    exit = { ...exit, y: 10 };
    animate = { ...animate, y: 0 };
  }

  // ## END: CALCULATE PICKER COORDINATES

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          ref={ref}
          animate={animate}
          className={`c-picker ${className || ''}`}
          exit={exit}
          initial={initial}
          style={{ ...positionStyle, ...style }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
