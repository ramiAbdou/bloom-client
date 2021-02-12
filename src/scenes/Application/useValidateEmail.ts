import useMutation from '@hooks/useMutation';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IsEmailTakenArgs } from './Application.types';

const useValidateEmail = () => {
  const [isEmailTaken] = useMutation<boolean, IsEmailTakenArgs>({
    operation: 'isEmailTaken',
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
        return db.byQuestionId[questionId]?.category === 'EMAIL';
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
