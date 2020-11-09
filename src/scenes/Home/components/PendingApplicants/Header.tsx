/**
 * @fileoverview Scene: Header
 * @author Rami Abdou
 */

import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Spinner from '@components/Loader/Spinner';
import { useStoreState } from '@store/Store';

type HeaderProps = { loading: boolean };

export default ({ loading }: HeaderProps) => {
  const numApplicants = useStoreState(
    ({ community }) => community?.pendingApplicants?.length
  );

  return (
    <div className="s-home-header">
      <div>
        <h1 className="s-home-header-title">
          Pending Applicants {numApplicants ? `(${numApplicants})` : ''}
        </h1>
        {loading && <Spinner dark />}
      </div>

      <div>
        <PrimaryButton title="Accept All" />
        <OutlineButton title="Reject All" />
      </div>
    </div>
  );
};
