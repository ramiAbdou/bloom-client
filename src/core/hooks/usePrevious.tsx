/**
 * @fileoverview Hook: usePrevious
 * Wraps any value and returns the previous value before an update to that value
 * happens.

 */

import { useEffect, useRef } from 'react';

export const usePrevious = (value: any) => {
  // The ref object is a generic container whose current property is mutable
  // and can hold any value, similar to an instance property on a class.
  const ref = useRef();

  // Store current value in ref.
  useEffect(() => {
    ref.current = value;
  }, [value]); // Re-run if value changes.

  // Return previous value (happens BEFORE update in useEffect above).
  // This is why it's called usePrevious, despite it returning the "current".
  return ref.current;
};
