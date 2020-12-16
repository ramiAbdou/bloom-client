import React from 'react';

import { ValueProps } from '@constants';

/**
 * Airtable-esque tag that has a faded primary color around some text.
 */
export default ({ value }: ValueProps) => (
  <p className="c-misc-tag">{value ?? 'N/A'}</p>
);
