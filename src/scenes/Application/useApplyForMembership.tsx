import { useHistory, useRouteMatch } from 'react-router-dom';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import {
  APPLY_FOR_MEMBERSHIP,
  ApplyForMembershipArgs
} from '@scenes/Application/Application.gql';
import { useStoreState } from '@store/Store';

const useApplyForMembership = (): OnFormSubmit => {
  const name = useStoreState(({ db }) => db.community?.urlName);

  const types = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return db.community?.types?.map((typeId: string) => byTypeId[typeId]);
  });

  const { push } = useHistory();
  const { url } = useRouteMatch();

  const [applyForMembership] = useMutation<any, ApplyForMembershipArgs>({
    name: 'applyForMembership',
    query: APPLY_FOR_MEMBERSHIP
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const paymentMethodId = items.find(
      ({ category }) => category === 'CREDIT_OR_DEBIT_CARD'
    )?.value;

    const dataToSubmit = items
      // .filter(({ pageId }) => pageId === 'APPLICATION')
      .map(({ category, id, value }) => ({
        category,
        questionId: id,
        value: parseValue(value)
      }));

    // Set the email so that the confirmation page displays the right email,
    // and use it for the GraphQL mutation as well.
    const email = items.find(({ category }) => category === 'EMAIL')?.value;

    const typeName = items.find(
      ({ category }) => category === 'MEMBERSHIP_TYPE'
    )?.value;

    const memberTypeId = types.find((type) => type.name === typeName)?.id;

    const { data, error } = await applyForMembership({
      data: dataToSubmit,
      email,
      memberTypeId,
      paymentMethodId,
      urlName: name
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    if (data) push(`${url}/confirmation`);
  };

  return onSubmit;
};

export default useApplyForMembership;
