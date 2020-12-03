/**
 * @fileoverview Component: Meta

 */

import './Typography.scss';

import React from 'react';

import { ChildrenProps } from '@constants';

export default ({ children }: ChildrenProps) => (
  <p className="c-typography-meta">{children}</p>
);
