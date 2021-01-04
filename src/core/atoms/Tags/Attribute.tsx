import React from 'react';

import { ChildrenProps } from '@constants';

interface AttributeProps extends ChildrenProps {
  // If the value is null, this determines whether or not the "N/A" text is
  // shown.
  showNullValue?: boolean;
}

/**
 * Airtable-esque tag that has a faded primary color around some text.
 */
export default ({ children, showNullValue }: AttributeProps) => {
  if (!showNullValue && !children) return null;
  return <p className="c-tag-attr">{children ?? 'N/A'}</p>;
};
