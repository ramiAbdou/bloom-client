import useMutation from '@hooks/useMutation';
import { MutationResult } from '@hooks/useMutation.types';
import { IMember, MemberStatus } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';

export interface RespondToApplicantsArgs {
  memberIds: string[];
  response: string;
}

interface UseRespondToApplicantsArgs {
  memberIds: string[];
  response: MemberStatus.ACCEPTED | MemberStatus.REJECTED;
}

const useRespondToApplicants = (
  args: UseRespondToApplicantsArgs
): MutationResult<IMember[], RespondToApplicantsArgs> => {
  const { memberIds, response } = args;

  const result: MutationResult<
    IMember[],
    RespondToApplicantsArgs
  > = useMutation<IMember[], RespondToApplicantsArgs>({
    fields: ['id', 'status'],
    operation: MutationEvent.RESPOND_TO_APPLICANTS,
    schema: [Schema.MEMBER],
    types: {
      memberIds: { required: true, type: '[String!]' },
      response: { required: true }
    },
    variables: { memberIds, response }
  });

  return result;
};

export default useRespondToApplicants;
