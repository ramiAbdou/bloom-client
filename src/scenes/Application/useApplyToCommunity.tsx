import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import { ApplyForMembershipArgs } from '@scenes/Application/Application.types';
import { IMemberType } from '@store/Db/entities';

const useApplyToCommunity = (): OnFormSubmit => {
  const [applyToCommunity] = useMutation<any, ApplyForMembershipArgs>({
    fields: ['id'],
    operation: 'applyToCommunity',
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

    const types: IMemberType[] = db.community?.types?.map((typeId: string) => {
      return db.byTypeId[typeId];
    });

    const emailId = db.community?.questions?.find((questionId: string) => {
      return db.byQuestionId[questionId]?.category === 'EMAIL';
    });

    const email = storyItems[emailId]?.value;
    const { paymentMethodId } = storyItems.CREDIT_OR_DEBIT_CARD?.value ?? {};
    const typeName = storyItems.MEMBERSHIP_TYPE?.value;
    const memberTypeId = types.find((type) => type.name === typeName)?.id;

    const data = Object.values(storyItems)
      .filter(({ questionId }) => !!questionId)
      .map(({ category, id, value }) => ({
        category,
        questionId: id,
        value: parseValue(value)
      }));

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
