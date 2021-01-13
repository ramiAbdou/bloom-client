import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import { LoadingProps, ModalType } from '@constants';
import { MainHeader, NavigationOptionProps } from '@containers/Main';
import useFinalPath from '@hooks/useFinalPath';
import { useStoreActions, useStoreState } from '@store/Store';

const DatbaseHeaderAddButton: React.FC = () => {
  const isOwner = useStoreState(({ db }) => db.isOwner);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isAdminsPage = useFinalPath() === 'admins';
  const isMembersPage = useFinalPath() === 'members';

  const onClick = () => {
    if (isMembersPage) showModal(ModalType.ADD_MEMBERS);
    else if (isAdminsPage && isOwner) showModal(ModalType.ADD_ADMINS);
  };

  return (
    <Button primary onClick={onClick}>
      {isMembersPage ? 'Add Member' : 'Add Admin'}
    </Button>
  );
};

const DatabaseHeader: React.FC<LoadingProps> = ({ loading }) => {
  const { push } = useHistory();

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), pathname: 'members', title: 'Members' },
    { onClick: () => push('admins'), pathname: 'admins', title: 'Admins' }
  ];

  return (
    <MainHeader
      className="s-database-header"
      loading={loading}
      options={options}
      title="Member Database"
    >
      <DatbaseHeaderAddButton />
    </MainHeader>
  );
};

export default DatabaseHeader;
