import day from 'dayjs';
import React from 'react';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { IMember } from '@core/db/db.entities';
import IdStore from '@core/store/Id.store';
import { useStoreActions } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import useBreakpoint from '@hooks/useBreakpoint';
import { ModalType } from '@util/constants';

const ApplicantsCardHeaderDetails: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['createdAt', 'firstName', 'lastName'],
    where: { id: memberId }
  });

  if (loading) return null;

  const formattedCreatedAt: string = day(member.createdAt).format('M/D/YY');
  const fullName: string = `${member.firstName} ${member.lastName}`;

  return (
    <div>
      <p className="c-gray-2 mb-xxs meta">Applied {formattedCreatedAt}</p>
      <h3>{fullName}</h3>
    </div>
  );
};

const ApplicantsCardHeaderExpandButton: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
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
