import React from 'react';

import InformationTip from '@components/Elements/InformationTip/InformationTip';
import { ChildrenProps } from '@constants';
import { makeClass } from '@util/util';

interface FormLabelProps extends ChildrenProps {
  required?: boolean;
  tooltip?: string;
}

export default ({ children, required, tooltip }: FormLabelProps) => {
  if (!children) return null;

  const css = makeClass(['c-form-label', [required, 'c-form-label--required']]);

  return (
    <div className={css}>
      <h4>{children}</h4>
      {tooltip && <InformationTip position="left" tooltip={tooltip} />}
    </div>
  );
};
