import React from 'react';
import { IoCalendar, IoPeople, IoPersonCircle } from 'react-icons/io5';

import useBreakpoint from '@hooks/useBreakpoint';
import { LinkOptions } from '../Nav.types';
import BottomBarStore from './BottomBar.store';
import BottomBarCommunityContainer from './BottomBarCommunityList';
import BottomBarLink from './BottomBarLink';

const BottomBarMobile: React.FC = () => {
  const mainLinks: LinkOptions[] = [
    { Icon: IoPeople, title: 'Directory', to: 'directory' },
    { Icon: IoCalendar, title: 'Events', to: 'events' },
    { Icon: IoPersonCircle, title: 'Profile', to: 'profile' }
  ];

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
  const mainLinks: LinkOptions[] = [
    { Icon: IoPeople, title: 'Directory', to: 'directory' },
    { Icon: IoCalendar, title: 'Events', to: 'events' },
    { Icon: IoPersonCircle, title: 'Profile', to: 'profile' }
  ];

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
      <footer className="o-bottom-bar">
        {isMobile && <BottomBarMobile />}
        {isTablet && <BottomBarTablet />}
      </footer>
    </BottomBarStore.Provider>
  );
};

export default BottomBar;
