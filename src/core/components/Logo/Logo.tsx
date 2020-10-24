/**
 * @fileoverview Component: Logo
 * @author Rami Abdou
 */

import './Logo.scss';

import React from 'react';

import { CommonProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import { bloomLogo } from './images';

interface LogoProps extends CommonProps {
  large?: boolean; // Makes logo appear 1.5x larger than normal.
}

export default ({ className, large }: LogoProps) => {
  const { css } = new CSSModifier()
    .class('c-logo-img')
    .addModifier(large, '--lg');

  return (
    <button className={`c-logo ${className}`}>
      <img alt="Bloom Logo" className={css} src={bloomLogo} />
    </button>
  );
};
