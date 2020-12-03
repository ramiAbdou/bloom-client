/**
 * @fileoverview Component: Logo

 */

import './Logo.scss';

import React from 'react';

import { ClassNameProps, StyleProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import { bloomLogo } from './images';

interface LogoProps extends ClassNameProps, StyleProps {
  multiplier?: number; // Changes the size of the logo dynamically.
}

const LOGO_HEIGHT = 18;
const LOGO_WIDTH = 75;

export default ({ className, multiplier }: LogoProps) => {
  const { css } = new CSSModifier().class('c-logo').class(className);

  const style = {
    height: LOGO_HEIGHT * (multiplier ?? 1),
    width: LOGO_WIDTH * (multiplier ?? 1)
  };

  return (
    <button>
      <img alt="Bloom Logo" className={css} src={bloomLogo} style={style} />
    </button>
  );
};
