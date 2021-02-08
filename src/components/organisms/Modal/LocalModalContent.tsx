import React from 'react';

import { ModalType } from '@constants';
import AdminDatabaseDemoteModal from '@scenes/Database/AdminDatabase/AdminDatabaseDemoteModal';
import MemberDatabaseDeleteModal from '@scenes/Database/MemberDatabase/MemberDatabaseDeleteModal';
import MemberDatabasePromoteModal from '@scenes/Database/MemberDatabase/MemberDatabasePromoteModal';
import IntegrationsMailchimpModal from '@scenes/Integrations/IntegrationsMailchimpModal';
import { cx } from '@util/util';
import ModalStore from './LocalModal.store';

const LocalModalCustomContent: React.FC = () => {
  const id: string = ModalStore.useStoreState((store) => store.id);

  if (id === ModalType.DELETE_MEMBERS) return <MemberDatabaseDeleteModal />;
  if (id === ModalType.DEMOTE_MEMBERS) return <AdminDatabaseDemoteModal />;
  if (id === ModalType.MAILCHIMP_FLOW) return <IntegrationsMailchimpModal />;
  if (id === ModalType.PROMOTE_MEMBERS) return <MemberDatabasePromoteModal />;

  return null;
};

const LocalModalContent: React.FC = () => {
  const className: string = ModalStore.useStoreState(
    (store) => store.className
  );

  const confirmation: boolean = ModalStore.useStoreState(
    (store) => store.options?.confirmation
  );

  const css = cx('c-modal', {
    'c-modal--confirmation': confirmation,
    [className]: className
  });

  return (
    <div className={css}>
      <LocalModalCustomContent />
    </div>
  );
};

export default LocalModalContent;
