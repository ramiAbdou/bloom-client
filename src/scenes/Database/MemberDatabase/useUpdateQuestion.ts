import useMutation from '@hooks/useMutation';
import { IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import { UpdateQuestionArgs } from '../Database.types';

const useUpdateQuestion = () => {
  const [updateQuestion] = useMutation<IQuestion, UpdateQuestionArgs>({
    fields: ['id', 'title'],
    operation: MutationEvent.UPDATE_QUESTION,
    schema: Schema.QUESTION,
    types: { questionId: { required: true }, title: { required: true } }
  });

  return updateQuestion;
};

export default useUpdateQuestion;
