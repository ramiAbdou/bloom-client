import { motion } from 'framer-motion';
import React from 'react';

import loader1 from './images/loader-1.svg';
import loader2 from './images/loader-2.svg';
import loader3 from './images/loader-3.svg';
import loader4 from './images/loader-4.svg';
import loader5 from './images/loader-5.svg';

type LoaderColumnProps = { images: { delay: number; img: any }[] };

// Each loader column has a delay before it appears. This creates the effect
// of something being loaded.

const LoaderColumn = ({ images }: LoaderColumnProps) => (
  <div>
    {images.map(({ img, delay }) => (
      <motion.img
        key={delay}
        alt="Loading Hexagon"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        src={img}
        transition={{ delay, duration: 1, yoyo: Infinity }}
      />
    ))}
  </div>
);

const DELAY = 1.5; // Represents 1500 ms.

/**
 * Hexagon-styled loader that is overlayed over the entire page when the entire
 * application is being loaded for the first time.
 */
export default () => (
  <div className="c-loader-ctr">
    <div className="c-loader">
      <LoaderColumn
        images={[
          { delay: DELAY * (5 / 7), img: loader2 },
          { delay: DELAY * (4 / 7), img: loader4 }
        ]}
      />

      <LoaderColumn
        images={[
          { delay: 0, img: loader1 },
          { delay: DELAY * (6 / 7), img: loader3 },
          { delay: DELAY * (3 / 7), img: loader5 }
        ]}
      />

      <LoaderColumn
        images={[
          { delay: DELAY * (1 / 7), img: loader2 },
          { delay: DELAY * (2 / 7), img: loader4 }
        ]}
      />
    </div>
  </div>
);
