import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { QuestionCategory } from '@util/constants';
import { ICommunity, IMember, IQuestion } from '@util/constants.entities';

const useValidateEmail = (): OnFormSubmitFunction => {
  const onSubmit = async ({
    gql,
    items,
    goForward,
    setError
  }: OnFormSubmitArgs) => {
    const { name, questions } = await gql.findOne(ICommunity, {
      fields: ['name', 'questions.category', 'questions.id'],
      where: { id: '' }
    });

    const emailId: string = questions.find(
      (question: IQuestion) => question.category === QuestionCategory.EMAIL
    ).id;

    const email: string = items[emailId]?.value as string;

    const existingMember: IMember = await gql.findOne(IMember, {
      fields: ['email'],
      where: { community: { id: '' }, email }
    });

    if (existingMember) {
      setError(`This email is already registered in ${name}.`);
      return;
    }

    goForward();
  };

  return onSubmit;
};

export default useValidateEmail;
