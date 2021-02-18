import React from 'react';

import { BaseProps } from '@constants';

interface AttributeProps extends BaseProps {
  // If the value is null, this determines whether or not the "N/A" text is
  // shown.
  showNullValue?: boolean;
}

/**
 * Airtable-esque tag that has a faded primary color around some text.
 */
const Attribute: React.FC<AttributeProps> = ({
  children,
  show,
  showNullValue
}) => {
  if ((!showNullValue && !children) || show === false) return null;
  return <p className="c-tag-attr">{children ?? 'N/A'}</p>;
};

export default Attribute;
