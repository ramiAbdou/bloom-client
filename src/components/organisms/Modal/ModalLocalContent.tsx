import React from 'react';

import { ModalType } from '@constants';
import AdminDatabaseDemoteModal from '@scenes/Database/AdminDatabase/AdminDatabaseDemoteModal';
import MemberDatabaseDeleteModal from '@scenes/Database/MemberDatabase/MemberDatabaseDeleteModal';
import MemberDatabasePromoteModal from '@scenes/Database/MemberDatabase/MemberDatabasePromoteModal';
import IntegrationsDetailsModal from '@scenes/Integrations/IntegrationsDetailsModal';
import IntegrationsMailchimpModal from '@scenes/Integrations/IntegrationsMailchimpModal';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';

const LocalModalCustomContent: React.FC = () => {
  const id: string = useStoreState(({ modal }) => modal.id);
  if (id === ModalType.DELETE_MEMBERS) return <MemberDatabaseDeleteModal />;
  if (id === ModalType.DEMOTE_MEMBERS) return <AdminDatabaseDemoteModal />;

  if (id === ModalType.INTEGRATIONS_DETAILS) {
    return <IntegrationsDetailsModal />;
  }

  if (id === ModalType.MAILCHIMP_FLOW) return <IntegrationsMailchimpModal />;
  if (id === ModalType.PROMOTE_MEMBERS) return <MemberDatabasePromoteModal />;

  return null;
};

const ModalLocalContent: React.FC = () => {
  const className: string = useStoreState(({ modal }) => modal.className);

  const confirmation: boolean = useStoreState(
    ({ modal }) => modal.options?.confirmation
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

export default ModalLocalContent;
