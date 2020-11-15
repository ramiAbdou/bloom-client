/**
 * @fileoverview Component: Picker
 * - Modal-like component that executes different actions based on the options.
 * This is similar to the Flow component, except there is only a singular
 * screen.
 * @author Rami Abdou
 */

import './Picker.scss';

import { AnimatePresence, motion } from 'framer-motion';
import React, { MutableRefObject, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { useStoreActions, useStoreState } from '@store/Store';
import PickerOption from './PickerOption';

// -----------------------------------------------------------------------------

export default () => {
  const actions = useStoreState(({ picker }) => picker.actions);
  const align = useStoreState(({ picker }) => picker.align);
  const coordinates = useStoreState(({ picker }) => picker.coordinates);
  const id = useStoreState(({ picker }) => picker.id);
  const isFixed = useStoreState(({ picker }) => picker.isFixed);
  const isShowing = useStoreState(({ picker }) => picker.isShowing);
  const offset = useStoreState(({ picker }) => picker.offset);
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

  if (!actions.length || !coordinates) return null;

  const { bottom, left, right, top } = coordinates;
  const { marginBottom, marginLeft, marginTop } = offset || {};

  const positionStyle = {
    ...(top ? { top } : { bottom }),
    ...(left ? { left } : { right }),
    ...(marginLeft ? { marginLeft } : {}),
    ...(marginTop ? { marginTop } : {}),
    ...(marginBottom ? { marginBottom } : {})
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
          style={{ ...positionStyle, position: isFixed ? 'fixed' : 'absolute' }}
          transition={{ duration: 0.2 }}
        >
          {actions.map((action) => (
            <PickerOption key={action.text} {...action} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
