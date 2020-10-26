/**
 * @fileoverview Component: Logo
 * @author Rami Abdou
 */

import './Logo.scss';

import React from 'react';

import { ClassNameProps, StyleProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import { bloomLogo } from './images';

interface LogoProps extends ClassNameProps, StyleProps {
  multiplier?: number;
}

const LOGO_HEIGHT = 18;
const LOGO_WIDTH = 75;

export default ({ className, multiplier }: LogoProps) => {
  const { css } = new CSSModifier().class('c-logo').class(className);

  const style = multiplier
    ? { height: LOGO_HEIGHT * multiplier, width: LOGO_WIDTH * multiplier }
    : {};

  return (
    <button>
      <img alt="Bloom Logo" className={css} src={bloomLogo} style={style} />
    </button>
  );
};
