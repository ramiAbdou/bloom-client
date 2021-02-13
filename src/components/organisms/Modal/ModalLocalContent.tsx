import React from 'react';

import { ModalType } from '@constants';
import AdminDatabaseDemoteForm from '@scenes/Database/AdminDatabase/AdminDatabaseDemoteForm';
import MemberDatabaseDeleteForm from '@scenes/Database/MemberDatabase/MemberDatabaseDeleteForm';
import MemberDatabasePromoteForm from '@scenes/Database/MemberDatabase/MemberDatabasePromoteForm';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';

const ModalLocalCustomContent: React.FC = () => {
  const id: string = useStoreState(({ modal }) => modal.id);

  if (id === ModalType.DELETE_MEMBERS) return <MemberDatabaseDeleteForm />;
  if (id === ModalType.DEMOTE_MEMBERS) return <AdminDatabaseDemoteForm />;
  if (id === ModalType.PROMOTE_MEMBERS) return <MemberDatabasePromoteForm />;

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
      <ModalLocalCustomContent />
    </div>
  );
};

export default ModalLocalContent;
