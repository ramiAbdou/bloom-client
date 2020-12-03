/**
 * @fileoverview Component: Loader
 * - Hexagon-styled loader that is overlayed over the entire page when
 * something is being fetched from our API.

 */

import './Loader.scss';

import { motion } from 'framer-motion';
import React from 'react';

import { loader1, loader2, loader3, loader4, loader5 } from './images';

type LoaderImage = { delay: number; img: any };
type LoaderColumnProps = { images: LoaderImage[] };

// Each loader column has a delay before it appears. This creates the effect
// of something being loaded.

const LoaderColumn = ({ images }: LoaderColumnProps) => (
  <div>
    {images.map(({ img, delay }: LoaderImage) => (
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
