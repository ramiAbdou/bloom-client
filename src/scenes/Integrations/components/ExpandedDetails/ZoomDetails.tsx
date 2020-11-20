/**
 * @fileoverview Component: Zoom Details
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';
import zoom from '../../images/zoom.svg';
import ExpandedDetails, { ExpandedDetailProps } from './ExpandedDetails';

export default () => {
  const email = useStoreState(
    ({ integrations }) => integrations.zoomAccountInfo?.email
  );

  const pmi = useStoreState(
    ({ integrations }) => integrations.zoomAccountInfo?.pmi
  );

  const zoomId = useStoreState(
    ({ integrations }) => integrations.zoomAccountInfo?.userId
  );

  const details: ExpandedDetailProps[] = [
    { label: 'Associated Email', value: email },
    { label: 'Personal Meeting ID', value: pmi },
    { label: 'User ID', value: zoomId }
  ];

  return <ExpandedDetails details={details} logo={zoom} name="Zoom" />;
};
