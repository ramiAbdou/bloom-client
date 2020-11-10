/**
 * @fileoverview Component: Tooltip
 * @author Rami Abdou
 */

import './Tooltip.scss';

import React, { useEffect, useState } from 'react';

import { useStoreActions, useStoreState } from '@store/Store';

export default () => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const clearTooltip = useStoreActions(({ tooltip }) => tooltip.clearTooltip);
  const ref = useStoreState(({ tooltip }) => tooltip.ref);
  const value = useStoreState(({ tooltip }) => tooltip.value);

  useEffect(() => {
    const element = ref?.current as HTMLElement;
    if (!element) return () => {};

    element.addEventListener('mouseleave', () => clearTooltip());

    setLeft(element.offsetLeft);
    setTop(element.offsetTop + element.offsetHeight);

    return () =>
      element.removeEventListener('mouseleave', () => clearTooltip());
  }, [ref?.current]);

  if (!ref?.current) return null;

  return (
    <p className="c-tip" style={{ left, top }}>
      {value}
    </p>
  );
};
