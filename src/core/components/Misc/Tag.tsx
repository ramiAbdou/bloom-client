/**
 * @fileoverview Component: Tag
 * @author Rami Abdou
 */

import './Misc.scss';

import React from 'react';

import { ValueProps } from '@constants';

export default ({ value }: ValueProps) => <p className="c-misc-tag">{value}</p>;
