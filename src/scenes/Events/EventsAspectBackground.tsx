import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import Aspect from '@containers/Aspect/Aspect';
import Network from '@images/network.svg';
import { cx } from '@util/util';

interface EventsAspectBackgroundProps extends ChildrenProps, ClassNameProps {
  imageUrl?: string;
}

const EventsAspectBackground: React.FC<EventsAspectBackgroundProps> = ({
  children,
  className,
  imageUrl
}) => {
  const css = cx('s-events-aspect-bg', { [className]: className });

  return (
    <Aspect className={css} ratio={2}>
      {imageUrl && <img alt="Profile Avatar" src={imageUrl} />}
      {!imageUrl && <div />}
      <Network />
      {children}
    </Aspect>
  );
};

export default EventsAspectBackground;
