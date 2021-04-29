import { DocumentNode, gql, useMutation } from '@apollo/client';
import { TableColumn } from '@components/organisms/Table/Table.types';
import { IQuestion } from '@util/constants.entities';

interface UpdateQuestionTitleArgs {
  questionId: string;
  title: string;
}

const UPDATE_QUESTION_TITLE: DocumentNode = gql`
  mutation UpdateQuestionTitle($questionId: String!, $title: String!) {
    updateQuestion(pk_columns: { id: $questionId }, _set: { title: $title }) {
      id
      title
    }
  }
`;

const useUpdateQuestionTitle = () => {
  const [updateQuestionTitle] = useMutation<IQuestion, UpdateQuestionTitleArgs>(
    UPDATE_QUESTION_TITLE
  );

  const onRenameColumn = async ({ id: questionId, title }: TableColumn) => {
    await updateQuestionTitle({ variables: { questionId, title } });
  };

  return onRenameColumn;
};

export default useUpdateQuestionTitle;
