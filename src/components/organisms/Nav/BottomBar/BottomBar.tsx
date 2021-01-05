import React, { useMemo } from 'react';
import { IoCalendar, IoPeople, IoPersonCircle } from 'react-icons/io5';

import useBreakpoint from '@hooks/useBreakpoint';
import { LinkOptions } from '../Nav.types';
import BottomBarCommunityContainer from './Community.container';
import BottomBarLink from './Link';
import BottomBarStore from './BottomBar.store';

const BottomBarMobile: React.FC = () => {
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

const BottomBarTablet: React.FC = () => {
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

const BottomBar: React.FC = () => {
  const isMobile = useBreakpoint() === 1;
  const isTablet = useBreakpoint() === 2;

  if (!isMobile && !isTablet) return null;

  return (
    <BottomBarStore.Provider>
      <footer className="s-home-bb">
        {isMobile && <BottomBarMobile />}
        {isTablet && <BottomBarTablet />}
      </footer>
    </BottomBarStore.Provider>
  );
};

export default BottomBar;
