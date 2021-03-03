import { useEffect, useState } from 'react';

// 1: Mobile
// 2: Tablet
// 3: Desktop
// 4: Monitor
export type Breakpoint = 1 | 2 | 3 | 4;

/**
 * Returns the appropriate breakpoint based on window width.
 *
 * @example useBreakpoint() => 1 (Mobile)
 * @example useBreakpoint() => 2 (Tablet)
 * @example useBreakpoint() => 3 (Desktop)
 * @example useBreakpoint() => 4 (Monitor)
 */
const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(null);

  const onWindowResize = () => {
    const { innerWidth } = window;
    if (innerWidth > 1440) setBreakpoint(4);
    else if (innerWidth > 1025) setBreakpoint(3);
    else if (innerWidth <= 1024 && innerWidth >= 576) setBreakpoint(2);
    else setBreakpoint(1);
  };

  // Add the window resize event listener.
  useEffect(() => {
    onWindowResize(); // Set the initial values.
    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
