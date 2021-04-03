import useBloomMutation from '@gql/useBloomMutation';
import { MutationResultVariablesFunction } from '@gql/useBloomMutation.types';
import { IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { UpdateQuestionArgs } from '../Database.types';

const useUpdateQuestion = (): MutationResultVariablesFunction<
  IQuestion,
  UpdateQuestionArgs
> => {
  const [updateQuestion] = useBloomMutation<IQuestion, UpdateQuestionArgs>({
    fields: ['id', 'title'],
    operation: MutationEvent.UPDATE_QUESTION,
    schema: Schema.QUESTION,
    types: { questionId: { required: true }, title: { required: true } }
  });

  return updateQuestion;
};

export default useUpdateQuestion;
