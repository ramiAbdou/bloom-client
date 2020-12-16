import React, { useMemo } from 'react';
import { IoCalendar, IoPeople, IoPersonCircle } from 'react-icons/io5';

import useBreakpoint from '@hooks/useBreakpoint';
import { LinkOptions } from '../../Home.store';
import BottomBarCommunityContainer from './Community.container';
import BottomBarLink from './Link';

const BottomBarMobile = () => {
  const mainLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoPeople, title: 'Directory', to: 'directory' },
      { Icon: IoCalendar, title: 'Events', to: 'events' },
      { Icon: IoPersonCircle, title: 'Profile', to: '/' }
    ],
    []
  );

  return (
    <>
      <div>
        <BottomBarCommunityContainer />
      </div>

      {mainLinks.map((props) => (
        <BottomBarLink key={props.title} {...props} />
      ))}
    </>
  );
};

const BottomBarTablet = () => {
  const mainLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoPeople, title: 'Directory', to: 'directory' },
      { Icon: IoCalendar, title: 'Events', to: 'events' },
      { Icon: IoPersonCircle, title: 'Profile', to: '/' }
    ],
    []
  );

  return (
    <>
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
    </>
  );
};

export default () => {
  const isMobile = useBreakpoint() === 'M';

  return (
    <footer className="s-home-bb">
      {isMobile && <BottomBarMobile />}
      {!isMobile && <BottomBarTablet />}
    </footer>
  );
};
