/**
 * @fileoverview Scene: Sidebar
 * @author Rami Abdou
 */

import React, { useEffect, useRef, useState } from 'react';

export default () => {
  const [height, setHeight] = useState('fit-content');

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const PADDING = 12;
  const MARGIN = 24;

  useEffect(() => {
    if (!ref?.current) return;
    setHeight(`calc(100% - ${ref?.current.offsetTop + PADDING + MARGIN}px)`);
  }, [ref?.current?.offsetTop]);

  if (!ref) return null;

  return (
    <div
      ref={ref}
      className="s-home-sidebar"
      style={{ height, marginTop: MARGIN, padding: PADDING }}
    >
      <button>Directory</button>
      <button>Events</button>
      <button>Your Membership</button>
      <button>Pending Applications</button>
    </div>
  );
};
