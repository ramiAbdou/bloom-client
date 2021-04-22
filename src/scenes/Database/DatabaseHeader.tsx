import React from 'react';
import { useHistory } from 'react-router-dom';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import MainHeader from '@components/containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@components/containers/Main/MainNavigationButton';
import { IMember, MemberRole } from '@util/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreActions } from '@core/store/Store';
import useFinalPath from '@hooks/useFinalPath';
import { LoadingProps, ModalType } from '@util/constants';

const DatbaseHeaderAddButton: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isAdminsPage: boolean = useFinalPath() === 'admins';
  const isMembersPage: boolean = useFinalPath() === 'members';

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading) return null;

  const isOwner: boolean = member.role === MemberRole.OWNER;

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
