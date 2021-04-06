import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import useBreakpoint from '@hooks/useBreakpoint';
import IdStore from '@store/Id.store';
import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';

const ApplicantsCardHeaderDetails: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const { createdAt, firstName, lastName } = useFindOne(IMember, {
    fields: ['createdAt', 'firstName', 'lastName'],
    where: { id: memberId }
  });

  const formattedCreatedAt: string = day(createdAt).format('M/D/YY');
  const fullName: string = `${firstName} ${lastName}`;

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
