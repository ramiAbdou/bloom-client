import React from 'react';

import { ValueProps } from '@constants';

/**
 * Airtable-esque tag that has a faded primary color around some text.
 */
export default ({ value }: ValueProps) => (
  <p className="c-misc-attr">{value ?? 'N/A'}</p>
);
