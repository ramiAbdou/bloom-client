import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import {
  APPLY_FOR_MEMBERSHIP,
  ApplyForMembershipArgs
} from '@scenes/Application/Application.gql';
import { IMemberType } from '@store/Db/entities';

const useApplyForMembership = (): OnFormSubmit => {
  const [applyForMembership] = useMutation<any, ApplyForMembershipArgs>({
    name: 'applyForMembership',
    query: APPLY_FOR_MEMBERSHIP
  });

  const onSubmit = async ({
    db,
    goForward,
    setError,
    storyItems
  }: OnFormSubmitArgs) => {
    const urlName: string = db.community?.urlName;
    const { byId: byQuestionId } = db.entities.questions;
    const { byId: byTypeId } = db.entities.types;

    const types: IMemberType[] = db.community?.types?.map((typeId: string) => {
      return byTypeId[typeId];
    });

    const emailId = db.community?.questions?.find((questionId: string) => {
      return byQuestionId[questionId]?.category === 'EMAIL';
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

    const { error } = await applyForMembership({
      data,
      email,
      memberTypeId,
      paymentMethodId,
      urlName
    });

    if (error) {
      setError(error);
      return;
    }

    goForward();
  };

  return onSubmit;
};

export default useApplyForMembership;
