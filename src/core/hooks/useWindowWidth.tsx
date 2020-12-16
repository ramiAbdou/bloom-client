import { useEffect, useState } from 'react';

export default (): number => {
  const [width, setWidth] = useState(0);

  const onWindowResize = () => setWidth(window.innerWidth);

  // Add the window resize event listener.
  useEffect(() => {
    onWindowResize(); // Set the initial values.
    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return width;
};
