import useManualQuery from '@hooks/useManualQuery';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IQuestion } from '@store/Db/entities';
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
    items,
    goForward,
    setError
  }: OnFormSubmitArgs) => {
    const emailId: string = db.community.questions.find(
      (questionId: string) => {
        const question: IQuestion = db.byQuestionId[questionId];
        return question?.category === QuestionCategory.EMAIL;
      }
    );

    const { error } = await isEmailTaken({
      communityId: db.community.id,
      email: items[emailId]?.value
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
