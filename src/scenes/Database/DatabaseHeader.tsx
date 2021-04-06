import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import MainHeader from '@containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@containers/Main/MainNavigationButton';
import { IMember, MemberRole } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import useFinalPath from '@hooks/useFinalPath';
import { useStoreActions, useStoreState } from '@store/Store';
import { LoadingProps, ModalType } from '@util/constants';

const DatbaseHeaderAddButton: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.member.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const isOwner: boolean = role === MemberRole.OWNER;

  const isAdminsPage: boolean = useFinalPath() === 'admins';
  const isMembersPage: boolean = useFinalPath() === 'members';

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

  const options: MainNavigationOptionProps[] = [
    {
      onClick: () => push('members'),
      pathname: 'members',
      title: 'Members'
    },
    {
      onClick: () => push('admins'),
      pathname: 'admins',
      title: 'Admins'
    }
  ];

  return (
    <MainHeader loading={loading} options={options} title="Member Database">
      <DatbaseHeaderAddButton />
    </MainHeader>
  );
};

export default DatabaseHeader;
