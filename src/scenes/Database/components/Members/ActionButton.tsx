/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosExit, IoMdFunnel } from 'react-icons/io';

import Button from '@components/Button/Button';
import ArrowUpCircle from '@components/Icons/ArrowUpCircle';
import Copy from '@components/Icons/Copy';
import Trash from '@components/Icons/Trash';

export const CopyEmailIcon = () => (
  <Button className="s-database-action" value="Copy Email">
    <Copy />
  </Button>
);

export const DeleteMemberIcon = () => (
  <Button className="s-database-action" value="Delete Member">
    <Trash />
  </Button>
);

export const ExportDataIcon = () => (
  <Button className="s-database-action" value="Export Member Data">
    <IoIosExit />
  </Button>
);

export const FilterIcon = () => (
  <Button className="s-database-action" value="Filter">
    <IoMdFunnel />
  </Button>
);

export const PromoteToAdminIcon = () => (
  <Button className="s-database-action" value="Promote to Admin">
    <ArrowUpCircle />
  </Button>
);
