import React from 'react';

import bloom from './images/bloom.svg';

interface LogoProps {
  multiplier?: number; // Changes the size of the logo dynamically.
}

const LOGO_HEIGHT = 18;
const LOGO_WIDTH = 75;

const BloomLogo: React.FC<LogoProps> = ({ multiplier }) => {
  const style = {
    height: LOGO_HEIGHT * (multiplier ?? 1),
    width: LOGO_WIDTH * (multiplier ?? 1)
  };

  return (
    <button>
      <img alt="Bloom Logo" className="c-misc-logo" src={bloom} style={style} />
    </button>
  );
};

export default BloomLogo;
