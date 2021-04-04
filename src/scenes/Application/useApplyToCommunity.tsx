import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import { ApplyForMembershipArgs } from '@scenes/Application/Application.types';
import { IMemberType, IPaymentMethod, IQuestion } from '@db/db.entities';
import { QuestionCategory } from '@util/constants';
import { MutationEvent } from '@util/constants.events';

const useApplyToCommunity = (): OnFormSubmitFunction => {
  const [applyToCommunity] = useBloomMutation<any, ApplyForMembershipArgs>({
    fields: ['id'],
    operation: MutationEvent.APPLY_TO_COMMUNITY,
    types: {
      data: { type: '[MemberValueInput!]!' },
      email: { required: true },
      memberTypeId: { required: false },
      paymentMethodId: { required: false },
      urlName: { required: true }
    }
  });

  const onSubmit = async ({
    db,
    goForward,
    setError,
    storyItems
  }: OnFormSubmitArgs) => {
    const urlName: string = db.community?.urlName;

    const types: IMemberType[] = db.community?.memberTypes?.map(
      (memberTypeId: string) => db.byMemberTypeId[memberTypeId]
    );

    const emailId = db.community?.questions?.find((questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === QuestionCategory.EMAIL;
    });

    const email: string = storyItems[emailId]?.value as string;

    const paymentMethodId: string = (storyItems.CREDIT_OR_DEBIT_CARD
      ?.value as IPaymentMethod)?.paymentMethodId as string;

    const typeName = storyItems.MEMBER_TYPE?.value;
    const memberTypeId = types.find((type) => type.name === typeName)?.id;

    const data = Object.values(storyItems)
      .filter(({ questionId }) => !!questionId)
      .map(({ category, id, value }) => {
        return {
          category,
          questionId: id,
          value: parseValue(value as string[])
        };
      });

    const result = await applyToCommunity({
      data,
      email,
      memberTypeId,
      paymentMethodId,
      urlName
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    goForward();
  };

  return onSubmit;
};

export default useApplyToCommunity;
