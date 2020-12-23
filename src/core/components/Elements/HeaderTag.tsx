import React from 'react';

import { ValueProps } from '@constants';

interface HeaderTagProps extends ValueProps {
  large?: boolean;
}

export default ({ value }: HeaderTagProps) => {
  if (!value) return null;
  return <p className="c-misc-header-tag">{value}</p>;
};
