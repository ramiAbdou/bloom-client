import useMutation from '@hooks/useMutation';
import { IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { UpdateQuestionArgs } from '../Database.types';

const useUpdateQuestion = () => {
  const [updateQuestion] = useMutation<IQuestion, UpdateQuestionArgs>({
    fields: ['id', 'title'],
    operation: 'updateQuestion',
    schema: Schema.QUESTION,
    types: { questionId: { required: true }, title: { required: true } }
  });

  return updateQuestion;
};

export default useUpdateQuestion;
