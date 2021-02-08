import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import { LoadingProps, ModalType } from '@constants';
import MainHeader from '@containers/Main/MainHeader';
import { NavigationOptionProps } from '@containers/Main/MainNavigation';
import useFinalPath from '@hooks/useFinalPath';
import ModalStore from '@organisms/Modal/Modal.store';
import { useStoreState } from '@store/Store';

const DatbaseHeaderAddButton: React.FC = () => {
  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');
  const showModal = ModalStore.useStoreActions((store) => store.showModal);

  const isAdminsPage = useFinalPath() === 'admins';
  const isMembersPage = useFinalPath() === 'members';

  const onClick = () => {
    if (isMembersPage) showModal({ id: ModalType.ADD_MEMBERS });
    else if (isAdminsPage && isOwner) showModal({ id: ModalType.ADD_ADMINS });
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
    <MainHeader loading={loading} options={options} title="Member Database">
      <DatbaseHeaderAddButton />
    </MainHeader>
  );
};

export default DatabaseHeader;
