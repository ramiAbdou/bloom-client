import useBloomMutation from '@gql/useBloomMutation';
import { MutationResult } from '@gql/useBloomMutation.types';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IMember, MemberStatus } from '@store/db/Db.entities';
import { Schema } from '@store/db/Db.schema';
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
    schema: [Schema.MEMBER],
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
