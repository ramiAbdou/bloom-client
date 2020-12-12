import deepequal from 'fast-deep-equal';
import React from 'react';

import { useStoreState } from '@store/Store';
import zoom from '../../images/zoom.svg';
import ExpandedDetails, { ExpandedDetailProps } from './ExpandedDetails';

export default () => {
  const { email, pmi, userId } = useStoreState(
    ({ db }) => db.integrations.zoomAccountInfo,
    deepequal
  );

  const details: ExpandedDetailProps[] = [
    { label: 'Associated Email', value: email },
    { label: 'Personal Meeting ID', value: pmi },
    { label: 'User ID', value: userId }
  ];

  return <ExpandedDetails details={details} logo={zoom} name="Zoom" />;
};
