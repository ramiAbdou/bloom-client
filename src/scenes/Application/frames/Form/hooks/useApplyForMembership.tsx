import { useHistory } from 'react-router-dom';

import { parseValue } from '@components/Form/Form.store';
import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import useMutation from '@hooks/useMutation';
import {
  APPLY_FOR_MEMBERSHIP,
  ApplyForMembershipArgs
} from '@scenes/Application/Application.gql';
import Application from '@scenes/Application/Application.store';
import { useStoreState } from '@store/Store';

export default (): OnFormSubmit => {
  const name = useStoreState(({ db }) => db.community?.encodedUrlName);
  const setEmail = Application.useStoreActions((store) => store.setEmail);

  const { push } = useHistory();

  const [applyForMembership] = useMutation<any, ApplyForMembershipArgs>({
    name: 'applyForMembership',
    query: APPLY_FOR_MEMBERSHIP
  });

  return async ({ items, setErrorMessage, setIsLoading }: OnFormSubmitArgs) => {
    const dataToSubmit = items.map(({ id, value }) => ({
      questionId: id,
      value: parseValue(value)
    }));

    // Set the email so that the confirmation page displays the right email,
    // and use it for the GraphQL mutation as well.
    const email = items.find(({ category }) => category === 'EMAIL')?.value;
    setEmail(email);

    // Manually set the isLoading variable to true.
    setIsLoading(true);

    const { data, error } = await applyForMembership({
      data: dataToSubmit,
      email,
      encodedUrlName: name
    });

    // Manually reset the isLoading variable to false.
    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    if (data) push(`/${name}/apply/confirmation`);
  };
};
