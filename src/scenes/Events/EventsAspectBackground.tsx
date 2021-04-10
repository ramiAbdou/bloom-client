import React from 'react';

import Aspect from '@components/containers/Aspect/Aspect';
import Network from '@components/images/network.svg';
import { ClassNameProps } from '@util/constants';

interface EventsAspectBackgroundProps extends ClassNameProps {
  imageUrl?: string;
}

const EventsAspectBackground: React.FC<EventsAspectBackgroundProps> = ({
  imageUrl
}) => (
  <Aspect className="o-form-item--cover-image-aspect" ratio={2}>
    {imageUrl && <img alt="Profile Avatar" src={imageUrl} />}
    {!imageUrl && <div />}
    {!imageUrl && <Network />}
  </Aspect>
);

export default EventsAspectBackground;
