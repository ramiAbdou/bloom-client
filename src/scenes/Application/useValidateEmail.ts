import { ICommunity, IMember, IQuestion } from '@db/db.entities';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { QuestionCategory } from '@util/constants';

const useValidateEmail = (): OnFormSubmitFunction => {
  const onSubmit = async ({
    db,
    gql,
    items,
    goForward,
    setError
  }: OnFormSubmitArgs) => {
    const { name, questions } = await gql.findOne(ICommunity, {
      fields: ['name', 'questions.category', 'questions.id'],
      where: { id: db.communityId }
    });

    const emailId: string = questions.find(
      (question: IQuestion) => question.category === QuestionCategory.EMAIL
    ).id;

    const email: string = items[emailId]?.value as string;

    const existingMember: IMember = await gql.findOne(IMember, {
      fields: ['email'],
      where: { community: { id: db.communityId }, email }
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
