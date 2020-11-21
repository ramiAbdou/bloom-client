/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';
import { IoMdFunnel } from 'react-icons/io';

import Button from '@components/Button/Button';

export const FilterIcon = () => (
  <Button className="s-database-action">
    <IoMdFunnel />
  </Button>
);
