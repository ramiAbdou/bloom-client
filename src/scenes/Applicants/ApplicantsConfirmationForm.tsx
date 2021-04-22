import React from 'react';

import Form from '@components/organisms/Form/Form';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { IMember, MemberStatus } from '@util/constants.entities';
import { useStoreState } from '@core/store/Store';

interface ApplicantsConfirmationModalMetadata {
  applicantIds: string[];
  response: MemberStatus.ACCEPTED | MemberStatus.REJECTED;
}

const ApplicantsConfirmationFormHeader: React.FC = () => {
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

const ApplicantsConfirmationForm: React.FC = () => {
  const applicantIds: string[] = useStoreState(
    ({ modal }) =>
      (modal.metadata as ApplicantsConfirmationModalMetadata).applicantIds
  );

  const response: MemberStatus.ACCEPTED | MemberStatus.REJECTED = useStoreState(
    ({ modal }) =>
      (modal.metadata as ApplicantsConfirmationModalMetadata).response
  );

  const onSubmit: OnFormSubmitFunction = async ({
    closeModal,
    gql,
    showToast
  }: OnFormSubmitArgs) => {
    const { error } = await gql.updateMany(IMember, {
      data: { status: response },
      where: { id: { _in: applicantIds } }
    });

    if (error) {
      throw new Error(error);
    }

    closeModal();
    showToast({ message: `Member(s) have been ${response.toLowerCase()}.` });
  };

  return (
    <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
      <ApplicantsConfirmationFormHeader />
      <ModalConfirmationActions />
    </Form>
  );
};

export default ApplicantsConfirmationForm;
