import React from 'react';

import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import FormHeader from '@organisms/Form/FormHeader';
import ModalConfirmationActions from '@organisms/Modal/ModalConfirmationActions';
import { MemberStatus } from '@db/Db.entities';
import { useStoreState } from '@store/Store';
import useRespondToApplicants from './useRespondToApplicants';

interface ApplicantsConfirmationModalMetadata {
  applicantIds: string[];
  response: MemberStatus.ACCEPTED | MemberStatus.REJECTED;
}

const ApplicantsConfirmationModalHeader: React.FC = () => {
  const applicantIds: string[] = useStoreState(
    ({ modal }) =>
      (modal.metadata as ApplicantsConfirmationModalMetadata).applicantIds
  );

  const response: MemberStatus.ACCEPTED | MemberStatus.REJECTED = useStoreState(
    ({ modal }) =>
      (modal.metadata as ApplicantsConfirmationModalMetadata).response
  );

  const applicantsCount: number = applicantIds.length;
  const verb: string = response === MemberStatus.ACCEPTED ? 'Accept' : 'Reject';

  const description: string =
    response === MemberStatus.ACCEPTED
      ? `Are you sure you want to accept these applicant(s)? We will send an email notification with next steps for them to onboard.`
      : 'Are you sure you want to reject these applicant(s)? You will not be able to reverse this action.';

  return (
    <FormHeader
      description={description}
      title={`${verb} ${applicantsCount} Applicant(s)?`}
    />
  );
};

const ApplicantsConfirmationModal: React.FC = () => {
  const applicantIds: string[] = useStoreState(
    ({ modal }) =>
      (modal.metadata as ApplicantsConfirmationModalMetadata).applicantIds
  );

  const response: MemberStatus.ACCEPTED | MemberStatus.REJECTED = useStoreState(
    ({ modal }) =>
      (modal.metadata as ApplicantsConfirmationModalMetadata).response
  );

  const respondToApplicants: OnFormSubmitFunction = useRespondToApplicants({
    memberIds: applicantIds,
    response
  });

  return (
    <Form options={{ disableValidation: true }} onSubmit={respondToApplicants}>
      <ApplicantsConfirmationModalHeader />
      <ModalConfirmationActions />
    </Form>
  );
};

export default ApplicantsConfirmationModal;
