import React from 'react';

import { ValueProps } from '@constants';

interface HeaderTagProps extends ValueProps {
  large?: boolean;
}

export default ({ value }: HeaderTagProps) => {
  if (value === null) return null;
  return <p className="c-tag-number">{value}</p>;
};
