import React, { useEffect } from 'react';

import AdminDatabaseDemoteForm from '@scenes/Database/AdminDatabase/AdminDatabaseDemoteForm';
import MemberDatabaseDeleteForm from '@scenes/Database/MemberDatabase/MemberDatabaseDeleteForm';
import MemberDatabasePromoteForm from '@scenes/Database/MemberDatabase/MemberDatabasePromoteForm';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { cx } from '@util/util';
import ModalContainer from './ModalContainer';

const ModalLocalCustomContent: React.FC = () => {
  const id: string = useStoreState(({ modal }) => modal.id);

  if (id === ModalType.DELETE_MEMBERS) return <MemberDatabaseDeleteForm />;
  if (id === ModalType.DEMOTE_MEMBERS) return <AdminDatabaseDemoteForm />;
  if (id === ModalType.PROMOTE_MEMBERS) return <MemberDatabasePromoteForm />;

  return null;
};

const ModalLocalContent: React.FC = () => {
  const className: string = useStoreState(({ modal }) => modal.className);
  const clearOptions = useStoreActions(({ modal }) => modal.clearOptions);

  const confirmation: boolean = useStoreState(
    ({ modal }) => modal.options?.confirmation
  );

  useEffect(() => {
    return () => clearOptions();
  }, []);

  const css: string = cx(
    'c-modal',
    { 'c-modal--confirmation': confirmation },
    className
  );

  return (
    <ModalContainer>
      <div className={css}>
        <ModalLocalCustomContent />
      </div>
    </ModalContainer>
  );
};

export default ModalLocalContent;
