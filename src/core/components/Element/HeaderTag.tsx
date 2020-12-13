import React from 'react';

import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface HeaderTagProps extends ValueProps {
  large?: boolean;
}

export default ({ large, value }: HeaderTagProps) => {
  if (!value) return null;

  const css = makeClass([
    'c-misc-header-tag',
    [large, 'c-misc-header-tag--lg']
  ]);

  return <p className={css}>{value}</p>;
};
