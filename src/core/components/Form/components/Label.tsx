import React from 'react';

import InformationTip from '@components/Elements/InformationTip/InformationTip';
import { ChildrenProps } from '@constants';
import { cx } from '@util/util';

interface FormLabelProps extends ChildrenProps {
  required?: boolean;
  small?: boolean;
  tooltip?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required,
  small,
  tooltip
}) => {
  if (!children) return null;

  const css = cx({ 'c-form-label': true, 'c-form-label--required': required });

  return (
    <div className={css}>
      {small && <h5>{children}</h5>}
      {!small && <h4>{children}</h4>}
      {tooltip && <InformationTip position="left" tooltip={tooltip} />}
    </div>
  );
};

export default FormLabel;
