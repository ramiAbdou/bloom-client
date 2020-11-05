/**
 * @fileoverview Component: Picker
 * - Modal-like component that executes different actions based on the options.
 * This is similar to the Flow component, except there is only a singular
 * screen.
 * @author Rami Abdou
 */

import './Picker.scss';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { PickerAction } from '@store/Picker.store';
import { useStoreActions, useStoreState } from '@store/Store';
import PickerContainer from './PickerContainer';

const ActionOption = ({ onClick, text }: PickerAction) => {
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  // After the passed-in onClick is executed, close the picker. This component
  // should not be used as a Flow. It is meant to be a one-time action picker.
  const onOptionClick = () => {
    onClick();
    closePicker();
  };

  return (
    <motion.button
      animate={{ y: 0 }}
      className="c-picker-option"
      initial={{ y: -15 }}
      onClick={onOptionClick}
    >
      {text}
    </motion.button>
  );
};

// This cancel option will always be there regardless of the other options.

const CancelOption = () => {
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  return (
    <motion.button
      animate={{ y: 0 }}
      className="c-picker-option--cancel"
      initial={{ y: -15 }}
      onClick={() => closePicker()}
    >
      Cancel
    </motion.button>
  );
};

// -----------------------------------------------------------------------------

export default () => {
  const actions = useStoreState(({ picker }) => picker.actions);
  const coordinates = useStoreState(({ picker }) => picker.coordinates);
  const id = useStoreState(({ picker }) => picker.id);
  const isFixed = useStoreState(({ picker }) => picker.isFixed);
  const isShowing = useStoreState(({ picker }) => picker.isShowing);
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);
  const isMobile = useStoreState(({ screen }) => screen.isMobile);

  const ref = useRef(null);

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

  const body = (
    <>
      {actions.map((action) => (
        <ActionOption key={action.text} {...action} />
      ))}

      {isMobile && <CancelOption />}
    </>
  );

  if (isMobile)
    return (
      <PickerContainer>
        <div ref={ref}>{body}</div>
      </PickerContainer>
    );

  if (!actions.length || !coordinates) return null;

  const { left, right, top } = coordinates;
  const positionStyle = left ? { left, top } : { right, top };

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          ref={ref}
          animate={{ opacity: 1, y: 0 }}
          className="c-picker--sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, y: -10 }}
          style={{
            ...positionStyle,

            position: isFixed ? 'fixed' : 'absolute'
          }}
          transition={{ duration: 0.2 }}
        >
          {body}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
