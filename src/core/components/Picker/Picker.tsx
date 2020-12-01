/**
 * @fileoverview Component: Picker
 * - Modal-like component that executes different actions based on the options.
 * This is similar to the Flow component, except there is only a singular
 * screen.
 * @author Rami Abdou
 */

import './Picker.scss';

import { AnimatePresence, motion } from 'framer-motion';
import React, { MutableRefObject, useMemo, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ChildrenProps, IdProps, StyleProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';

interface PickerProps extends ChildrenProps, IdProps, StyleProps {}

export default ({ children, id: PICKER_ID, style }: PickerProps) => {
  const align = useStoreState(({ picker }) => picker.align);
  const coordinates = useStoreState(({ picker }) => picker.coordinates);
  const id = useStoreState(({ picker }) => picker.id);
  const isFixed = useStoreState(({ picker }) => picker.isFixed);
  const isShowing = useStoreState(({ picker }) => picker.isShowing);
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);
  const isMobile = useStoreState(({ screen }) => screen.isMobile);

  const ref: MutableRefObject<HTMLDivElement> = useRef(null);

  useOnClickOutside(ref, (event) => {
    if (isMobile) {
      closePicker();
      return;
    }

    const element: HTMLElement = document.getElementById(id);

    // If the element doesn't exist, then just close the picker.
    if (!element) {
      closePicker();
      return;
    }

    // @ts-ignore b/c we know that clientX and clientY exist on the HTML Event.
    const { clientX, clientY } = event;
    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = element;

    // If the click happened within the element that was used to open the
    // Picker, then we don't close the picker.
    if (
      clientX < offsetLeft ||
      clientX > offsetLeft + offsetWidth ||
      clientY < offsetTop ||
      clientY > offsetTop + offsetHeight
    )
      closePicker();
  });

  const shouldShowPicker = useMemo(() => isShowing && PICKER_ID === id, [
    isShowing,
    id === PICKER_ID
  ]);

  if (!shouldShowPicker || !coordinates) return null;

  const { bottom, left, right, top } = coordinates;

  const positionStyle = {
    ...(top ? { top } : { bottom }),
    ...(left ? { left } : { right })
  };

  const animate = {
    opacity: 1,
    ...(align === 2 || align === 4 ? { x: 0 } : { y: 0 })
  };

  const initial = {
    opacity: 0,
    ...(align === 2 || align === 4 ? { x: -10 } : { y: -10 })
  };

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          ref={ref}
          animate={animate}
          className="c-picker-content"
          exit={{ opacity: 0 }}
          initial={initial}
          style={{
            ...positionStyle,
            ...style,
            position: isFixed ? 'fixed' : 'absolute'
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
