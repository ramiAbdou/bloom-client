import { motion } from 'framer-motion';
import React from 'react';

import Show from '@containers/Show';
import { useStoreState } from '@store/Store';
import Loader1 from './images/loader-1.svg';
import Loader2 from './images/loader-2.svg';
import Loader3 from './images/loader-3.svg';
import Loader4 from './images/loader-4.svg';
import Loader5 from './images/loader-5.svg';

type LoaderColumnProps = { images: { delay: number; Loader: React.FC }[] };

// Each loader column has a delay before it appears. This creates the effect
// of something being loaded.

const LoaderColumn: React.FC<LoaderColumnProps> = ({ images }) => (
  <div>
    {images.map(({ Loader, delay }) => (
      <motion.div
        key={delay}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay, duration: 1, yoyo: Infinity }}
      >
        <Loader />
      </motion.div>
    ))}
  </div>
);

const DELAY = 1.5; // Represents 1500 ms.

/**
 * Hexagon-styled loader that is overlayed over the entire page when the entire
 * application is being loaded for the first time.
 */
const Loader: React.FC = () => {
  const isShowing = useStoreState(({ loader }) => loader.isShowing);

  return (
    <Show show={isShowing}>
      <div className="c-loader-ctr">
        <div className="c-loader">
          <LoaderColumn
            images={[
              { Loader: Loader2, delay: DELAY * (5 / 7) },
              { Loader: Loader4, delay: DELAY * (4 / 7) }
            ]}
          />

          <LoaderColumn
            images={[
              { Loader: Loader1, delay: 0 },
              { Loader: Loader3, delay: DELAY * (6 / 7) },
              { Loader: Loader5, delay: DELAY * (3 / 7) }
            ]}
          />

          <LoaderColumn
            images={[
              { Loader: Loader2, delay: DELAY * (1 / 7) },
              { Loader: Loader4, delay: DELAY * (2 / 7) }
            ]}
          />
        </div>
      </div>
    </Show>
  );
};

export default Loader;
