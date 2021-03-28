import useMutation from '@hooks/useMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import { ApplyForMembershipArgs } from '@scenes/Application/Application.types';
import { IMemberPlan, IQuestion } from '@store/Db/entities';
import { QuestionCategory } from '@util/constants';
import { MutationEvent } from '@util/constants.events';

const useApplyToCommunity = (): OnFormSubmitFunction => {
  const [applyToCommunity] = useMutation<unknown, ApplyForMembershipArgs>({
    fields: ['id'],
    operation: MutationEvent.APPLY_TO_COMMUNITY,
    types: {
      data: { type: '[MemberValueInput!]!' },
      email: { required: true },
      memberPlanId: { required: false },
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

    const types: IMemberPlan[] = db.community?.plans?.map((planId: string) => {
      return db.byMemberPlanId[planId];
    });

    const emailId = db.community?.questions?.find((questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === QuestionCategory.EMAIL;
    });

    const email = storyItems[emailId]?.value;
    const { paymentMethodId } = storyItems.CREDIT_OR_DEBIT_CARD?.value ?? {};
    const typeName = storyItems.MEMBER_PLAN?.value;

    const memberPlanId = types.find((type) => {
      return type.name === typeName;
    })?.id;

    const data = Object.values(storyItems)
      .filter(({ questionId }) => {
        return !!questionId;
      })
      .map(({ category, id, value }) => {
        return {
          category,
          questionId: id,
          value: parseValue(value)
        };
      });

    const result = await applyToCommunity({
      data,
      email,
      memberPlanId,
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
