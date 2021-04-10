import { IMember, MemberStatus } from '@db/db.entities';
import useBloomMutation, { MutationResult } from '@gql/hooks/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { MutationEvent } from '@util/constants.events';

export interface RespondToApplicantsArgs {
  memberIds: string[];
  response: string;
}

interface UseRespondToApplicantsArgs {
  memberIds: string[];
  response: MemberStatus.ACCEPTED | MemberStatus.REJECTED;
}

const useRespondToApplicants = ({
  memberIds,
  response
}: UseRespondToApplicantsArgs): OnFormSubmitFunction => {
  const [respondToApplicants]: MutationResult<
    IMember[],
    RespondToApplicantsArgs
  > = useBloomMutation<IMember[], RespondToApplicantsArgs>({
    fields: ['id', 'status'],
    operation: MutationEvent.RESPOND_TO_APPLICANTS,
    types: {
      memberIds: { required: true, type: '[String!]' },
      response: { required: true }
    },
    variables: { memberIds, response }
  });

  const onSubmit = async ({ closeModal, showToast }: OnFormSubmitArgs) => {
    await respondToApplicants();
    closeModal();
    showToast({ message: `Member(s) have been ${response.toLowerCase()}.` });
  };

  return onSubmit;
};

export default useRespondToApplicants;
