import { useLayoutEffect } from 'react';

/**
 * @see https://usehooks.com/useLockBodyScroll/
 */
const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when component unmounts.
      document.body.style.overflow = 'auto';
    };
  }, []);
};

export default useLockBodyScroll;
