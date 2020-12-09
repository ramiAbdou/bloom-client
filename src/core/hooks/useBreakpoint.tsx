import { useEffect, useState } from 'react';

type Breakpoint = 'D' | 'T' | 'M';

export default (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('D');

  const onWindowResize = () => {
    const { innerWidth } = window;
    if (innerWidth > 1025) setBreakpoint('D');
    else if (innerWidth <= 1024 && innerWidth >= 576) setBreakpoint('T');
    else setBreakpoint('M');
  };

  // Add the window resize event listener.
  useEffect(() => {
    onWindowResize(); // Set the initial values.
    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return breakpoint;
};