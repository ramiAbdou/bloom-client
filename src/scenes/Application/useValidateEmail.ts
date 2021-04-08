import { IQuestion } from '@db/db.entities';
import useManualQuery from '@gql/useManualQuery';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { QuestionCategory } from '@util/constants';
import { QueryEvent } from '@util/constants.events';
import { IsEmailTakenArgs } from './Application.types';

const useValidateEmail = (): OnFormSubmitFunction => {
  const [isEmailTaken] = useManualQuery<boolean, IsEmailTakenArgs>({
    operation: QueryEvent.IS_EMAIL_TAKEN,
    types: { communityId: { required: true }, email: { required: true } }
  });

  const onSubmit = async ({
    db,
    gql,
    items,
    goForward,
    setError
  }: OnFormSubmitArgs) => {
    const { data: community } = await gql.communities.findOne({
      fields: ['questions.category', 'questions.id'],
      where: { id: db.communityId }
    });

    const { questions } = community;

    const emailId: string = questions.find(
      (question: IQuestion) => question.category === QuestionCategory.EMAIL
    ).id;

    const { error } = await isEmailTaken({
      communityId: db.communityId,
      email: items[emailId]?.value as string
    });

    if (error) {
      setError(error);
      return;
    }

    goForward();
  };

  return onSubmit;
};

export default useValidateEmail;
