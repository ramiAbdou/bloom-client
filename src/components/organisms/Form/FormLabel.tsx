import React from 'react';

import InformationTip from '@atoms/InformationTip/InformationTip';
import { cx } from '@util/util';

interface FormLabelProps {
  marginBottom?: number;
  required?: boolean;
  tooltip?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  children,
  marginBottom,
  required,
  tooltip
}) => {
  if (!children) return null;

  const css: string = cx('o-form-label', {
    'o-form-label--required': required
  });

  return (
    <div className={css} style={{ marginBottom }}>
      <h4>{children}</h4>
      {tooltip && <InformationTip position="left" tooltip={tooltip} />}
    </div>
  );
};

export default FormLabel;
