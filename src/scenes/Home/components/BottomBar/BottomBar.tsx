import React, { useMemo } from 'react';
import { IoCalendar, IoPeople, IoPersonCircle } from 'react-icons/io5';

import { LinkOptions } from '../../Home.store';
import BottomBarCommunityContainer from './Community.container';
import BottomBarLink from './Link';

export default () => {
  const mainLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoPeople, title: 'Directory', to: 'directory' },
      { Icon: IoCalendar, title: 'Events', to: 'events' },
      { Icon: IoPersonCircle, title: 'Profile', to: '/' }
    ],
    []
  );

  return (
    <footer className="s-home-bb">
      <div>
        <BottomBarCommunityContainer />
      </div>

      <div>
        {mainLinks.map((props) => (
          <BottomBarLink key={props.title} {...props} />
        ))}
      </div>

      <div>
        <BottomBarCommunityContainer />
      </div>
    </footer>
  );
};
