import {
  ICommunity,
  IMemberType,
  IPaymentMethod,
  IQuestion
} from '@db/db.entities';
import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import { ApplyForMembershipArgs } from '@scenes/Application/Application.types';
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
    gql,
    goForward,
    setError,
    storyItems
  }: OnFormSubmitArgs) => {
    const { data: community } = await gql.findOne(ICommunity, {
      fields: [
        'questions.category',
        'questions.id',
        'memberTypes.id',
        'memberTypes.name',
        'urlName'
      ],
      where: { id: db.communityId }
    });

    const { memberTypes, questions } = community;

    const emailId: string = questions.find(
      (question: IQuestion) => question.category === QuestionCategory.EMAIL
    ).id;

    const email: string = storyItems[emailId]?.value as string;

    const paymentMethodId: string = (storyItems.CREDIT_OR_DEBIT_CARD
      ?.value as IPaymentMethod)?.paymentMethodId as string;

    const memberTypeName = storyItems.MEMBER_TYPE?.value;

    const memberTypeId = memberTypes.find(
      (memberType: IMemberType) => memberType.name === memberTypeName
    )?.id;

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
      urlName: community.urlName
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
