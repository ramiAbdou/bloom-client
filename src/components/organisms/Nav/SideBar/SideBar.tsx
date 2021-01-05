import React, { useMemo } from 'react';
import {
  IoAdd,
  IoAlertCircleOutline,
  IoCalendar,
  IoExtensionPuzzle,
  IoFolderOpen,
  IoGlobe,
  IoPeople,
  IoPersonAdd,
  IoStatsChart
} from 'react-icons/io5';

import Button from '@atoms/Button';
import Separator from '@atoms/Separator';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreActions, useStoreState } from '@store/Store';
import { LinkOptions } from '../Nav.types';
import SidebarCommunityContainer from './Community.container';
import SidebarProfile from './Profile';
import SidebarSection from './Section';

const SidebarContent = () => {
  const canCollectDues = useStoreState(({ db }) => db.canCollectDues);
  const name = useStoreState(({ db }) => db.community.name);
  const hasPaid = useStoreState(({ db }) => db.member?.duesStatus === 'ACTIVE');
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const mainLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoPeople, title: 'Directory', to: 'directory' },
      { Icon: IoCalendar, title: 'Events', to: 'events' }
    ],
    []
  );

  const adminLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoStatsChart, title: 'Analytics', to: 'analytics' },
      { Icon: IoGlobe, title: 'Member Database', to: 'database' },
      { Icon: IoFolderOpen, title: 'Pending Applicants', to: 'applicants' },
      { Icon: IoExtensionPuzzle, title: 'Integrations', to: 'integrations' }
    ],
    []
  );

  const quickLinks: LinkOptions[] = useMemo(
    () => [
      { Icon: IoAdd, title: 'Create Event', to: '' },
      {
        Icon: IoPersonAdd,
        onClick: () => showModal('ADD_MEMBERS'),
        title: 'Add Member'
      }
    ],
    []
  );

  const onClick = () => showModal('PAY_DUES');

  return (
    <div className="s-home-sidebar-main">
      <h2>{name}</h2>
      <Separator style={{ marginBottom: 12, marginTop: 24 }} />

      <div className="s-home-sidebar-section-ctr">
        <SidebarSection links={mainLinks} title="Main" />
        <SidebarSection links={adminLinks} title="Admin" />
        <SidebarSection links={quickLinks} title="Quick Actions" />
      </div>

      {canCollectDues && (
        <div className="s-home-sidebar-dues-ctr">
          {!hasPaid && (
            <>
              <div>
                <IoAlertCircleOutline />
                <h4>Dues Status: Inactive</h4>
              </div>

              <Button secondary onClick={onClick}>
                Pay Dues
              </Button>
            </>
          )}
        </div>
      )}

      <div>
        <SidebarProfile />
      </div>
    </div>
  );
};

const SideBar: React.FC = () => {
  const isDesktop = useBreakpoint() >= 3;
  if (!isDesktop) return null;

  return (
    <div className="s-home-sidebar">
      <SidebarCommunityContainer />
      <SidebarContent />
    </div>
  );
};

export default SideBar;
