import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import AspectRatio from '@containers/AspectRatio/AspectRatio';
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
    <AspectRatio className={css} ratio={2}>
      {children}
      {imageUrl && <img alt="Profile Avatar" src={imageUrl} />}
      {!imageUrl && <div />}
      <Network />
      <Network />
    </AspectRatio>
  );
};

export default EventsAspectBackground;
