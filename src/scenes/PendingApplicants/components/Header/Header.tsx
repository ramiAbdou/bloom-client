/**
 * @fileoverview Scene: Header
 * @author Rami Abdou
 */

import React, { memo } from 'react';

import Spinner from '@components/Loader/Spinner';
import { LoadingProps } from '@constants';
import { useStoreState } from '@store/Store';
import { AcceptAllButton, IgnoreAllButton } from './HeaderButton';

export default memo(({ loading }: LoadingProps) => {
  const title = useStoreState(
    ({ community }) => {
      const length = community?.pendingApplicants?.length;
      return length ? `Pending Applicants (${length})` : 'Pending Applicants';
    },
    (prev: string, next: string) => prev === next
  );

  return (
    <div className="s-home-header s-applicants-header">
      <div>
        <h1 className="s-home-header-title">{title}</h1>
        {loading && <Spinner dark />}
      </div>

      <div>
        <AcceptAllButton />
        <IgnoreAllButton />
      </div>
    </div>
  );
});
