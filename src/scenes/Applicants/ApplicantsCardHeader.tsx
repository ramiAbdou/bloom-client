import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import useBreakpoint from '@hooks/useBreakpoint';
import { IMember } from '@store/db/Db.entities';
import IdStore from '@store/Id.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';

const ApplicantsCardHeaderDetails: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const createdAt: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return day(member?.createdAt).format('M/D/YY');
  });

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return `${member?.firstName} ${member?.lastName}`;
  });

  return (
    <div>
      <p className="c-gray-2 mb-xxs meta">Applied {createdAt}</p>
      <h3>{fullName}</h3>
    </div>
  );
};

const ApplicantsCardHeaderExpandButton: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const memberId: string = IdStore.useStoreState(({ id }) => id);
  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = () => {
    showModal({ id: ModalType.APPLICANT, metadata: memberId });
  };

  return (
    <Button tertiary onClick={onClick}>
      {isMobile ? 'See Full' : 'See Full Application'}
    </Button>
  );
};

const ApplicantsCardHeader: React.FC = () => (
  <Row wrap className="mb-md--nlc" gap="xs" justify="sb">
    <ApplicantsCardHeaderDetails />
    <ApplicantsCardHeaderExpandButton />
  </Row>
);

export default ApplicantsCardHeader;
