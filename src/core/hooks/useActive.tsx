/**
 * @fileoverview Hook: useActive
 * @author Rami Abdou
 */

/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';

export const useActive = (): [React.MutableRefObject<any>, boolean] => {
  const [isActive, setIsActive] = useState(false);
  const ref: React.MutableRefObject<any> = useRef(null);

  const handleOnClick = () => setIsActive(true);
  useOnClickOutside(ref, () => isActive && setIsActive(false));

  useEffect(() => {
    if (!ref?.current) return;

    const { current: node } = ref;
    node.addEventListener('click', handleOnClick);

    if (isActive && document.activeElement !== node) setIsActive(false);
    else if (!isActive && document.activeElement === node) setIsActive(true);

    return () => {
      node.removeEventListener('click', handleOnClick);
    };
  }, [document.activeElement, ref.current]);

  return [ref, isActive];
};
