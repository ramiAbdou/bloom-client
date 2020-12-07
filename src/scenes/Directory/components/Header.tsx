import React, { memo } from 'react';

import Spinner from '@components/Loader/Spinner';
import { LoadingProps } from '@constants';

export default memo(({ loading }: LoadingProps) => (
  <div className="s-home-header">
    <div>
      <h1 className="s-home-header-title">Directory</h1>
      {loading && <Spinner dark />}
    </div>
  </div>
));
