/**
 * @fileoverview Hook: useHover
 * - Returns the ref that we pass into a React component, as well as the status
 * of isHovered.
 * @author Rami Abdou
 */

/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

export const useHover = (): [React.MutableRefObject<any>, boolean] => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(
    () => {
      if (!ref?.current) return;

      const { current: node } = ref;
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    },
    [ref.current] // Only if the ref changes, we update the value.
  );

  return [ref, isHovered];
};
