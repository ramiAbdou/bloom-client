import React from 'react';

import InformationTip from '@atoms/InformationTip/InformationTip';
import { ChildrenProps } from '@constants';
import { cx } from '@util/util';

interface FormLabelProps extends ChildrenProps {
  required?: boolean;
  tooltip?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required,
  tooltip
}) => {
  if (!children) return null;

  const css = cx({ 'o-form-label': true, 'o-form-label--required': required });

  return (
    <div className={css}>
      <h4>{children}</h4>
      {tooltip && <InformationTip position="left" tooltip={tooltip} />}
    </div>
  );
};

export default FormLabel;
