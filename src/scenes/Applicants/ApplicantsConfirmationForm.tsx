import React from 'react';
import { showToast } from 'src/App.reactive';

import {
  ApolloCache,
  DocumentNode,
  gql,
  Reference,
  useMutation
} from '@apollo/client';
import Form, {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import FormHeader from '@components/organisms/Form/FormHeader';
import Modal from '@components/organisms/Modal/Modal';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import ModalConfirmationActions from '@components/organisms/Modal/ModalConfirmationActions';
import { IMember, MemberStatus } from '@util/constants.entities';

interface UpdateApplicantStatusesArgs {
  memberIds: string[];
  status: MemberStatus;
}

interface UpdateApplicantStatusesResult {
  updateMembers: { returning: IMember[] };
}

const UPDATE_APPLICANT_STATUSES: DocumentNode = gql`
  mutation UpdateApplicantStatuses($memberIds: [String!]!, $status: String!) {
    updateMembers(
      where: { id: { _in: $memberIds } }
      _set: { status: $status }
    ) {
      returning {
        id
        status
      }
    }
  }
`;

interface ApplicantsConfirmationModalMetadata {
  applicantIds: string[];
  response: MemberStatus.ACCEPTED | MemberStatus.REJECTED;
}

const ApplicantsConfirmationFormHeader: React.FC = () => {
  const applicantIds: string[] = (modalVar()
    ?.metadata as ApplicantsConfirmationModalMetadata)?.applicantIds;

  const response: MemberStatus.ACCEPTED | MemberStatus.REJECTED = (modalVar()
    ?.metadata as ApplicantsConfirmationModalMetadata)?.response;

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
  const [updateMemberStatuses] = useMutation<
    UpdateApplicantStatusesResult,
    UpdateApplicantStatusesArgs
  >(UPDATE_APPLICANT_STATUSES, {
    update: (cache: ApolloCache<UpdateApplicantStatusesResult>, { data }) => {
      const members: IMember[] = data?.updateMembers?.returning;

      cache.modify({
        fields: {
          members: (existingMemberRefs: Reference[] = []) => {
            const newMemberRefs: Reference[] = members.map((member: IMember) =>
              cache.writeFragment({
                data: member,
                fragment: gql`
                  fragment NewMember on members {
                    id
                    status
                  }
                `
              })
            );

            return [...existingMemberRefs, ...newMemberRefs];
          }
        }
      });
    }
  });

  const applicantIds: string[] = (modalVar()
    ?.metadata as ApplicantsConfirmationModalMetadata)?.applicantIds;

  const response: MemberStatus.ACCEPTED | MemberStatus.REJECTED = (modalVar()
    ?.metadata as ApplicantsConfirmationModalMetadata)?.response;

  const onSubmit: OnFormSubmitFunction = async ({
    formDispatch
  }: OnFormSubmitArgs) => {
    try {
      await updateMemberStatuses({
        variables: { memberIds: applicantIds, status: response }
      });

      closeModal();
      showToast({ message: `Member(s) have been ${response.toLowerCase()}.` });
    } catch {
      formDispatch({
        error: 'Failed to update the applicant status(s).',
        type: 'SET_ERROR'
      });
    }
  };

  return (
    <Modal>
      <Form options={{ disableValidation: true }} onSubmit={onSubmit}>
        <ApplicantsConfirmationFormHeader />
        <ModalConfirmationActions />
      </Form>
    </Modal>
  );
};

export default ApplicantsConfirmationForm;
