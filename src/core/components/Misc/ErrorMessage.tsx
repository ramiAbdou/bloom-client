/**
 * @fileoverview Component: ErrorMessage
 * @author Rami Abdou
 */

import './Misc.scss';

import React from 'react';

import { error } from './images';

type ErrorMessageProps = { message: string };

export default ({ message }: ErrorMessageProps) => (
  <div className="c-misc-error">
    <img alt="Error Icon" src={error} />
    <p>{message}</p>
  </div>
);
