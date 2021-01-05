import React, { useEffect, useMemo } from 'react';
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
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import Separator from '@atoms/Separator';
import { useStoreActions, useStoreState } from '@store/Store';
import Home, { LinkOptions } from '../Home.store';
import SidebarCommunityContainer from './Community.container';
import SidebarProfile from './Profile';
import SidebarSection from './Section/Section';

const useActiveTo = () => {
  const encodedUrlName = useStoreState(({ db }) => db.community.encodedUrlName);

  const { location } = useHistory();
  const { pathname } = location;

  // The index after the / following the community's name.
  const startIndex =
    pathname.indexOf(`${encodedUrlName}/`) + encodedUrlName.length + 1;

  // If there is another / in the URL then just go up until then. Otherwise,
  // take the entire rest of the string.
  const finalIndex = pathname.includes('/', startIndex)
    ? pathname.lastIndexOf('/')
    : pathname.length;

  return pathname.substring(startIndex, finalIndex);
};

const SidebarContent = () => {
  const canCollectDues = useStoreState(({ db }) => db.canCollectDues);
  const name = useStoreState(({ db }) => db.community.name);
  const hasPaid = useStoreState(({ db }) => db.member?.duesStatus === 'ACTIVE');
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setActiveTo = Home.useStoreActions((store) => store.setActiveTo);

  const activeTo = useActiveTo();

  useEffect(() => {
    setActiveTo(activeTo);
  }, [activeTo]);

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

export default () => (
  <div className="s-home-sidebar">
    <SidebarCommunityContainer />
    <SidebarContent />
  </div>
);
