import { useMutation } from 'graphql-hooks';
import { useHistory } from 'react-router-dom';

import { parseValue } from '@components/Form/Form.store';
import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import { useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { APPLY_FOR_MEMBERSHIP } from '../../Application.gql';
import Application from '../../Application.store';

export default (): OnFormSubmit => {
  const name = useStoreState(({ db }) => db.community?.encodedUrlName);
  const setEmail = Application.useStoreActions((store) => store.setEmail);

  const { push } = useHistory();
  const [applyForMembership] = useMutation(APPLY_FOR_MEMBERSHIP);

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
      variables: { data: dataToSubmit, email, encodedUrlName: name }
    });

    // Manually reset the isLoading variable to false.
    setIsLoading(false);

    if (error) {
      const errorMessage = getGraphQLError(error);
      setErrorMessage(errorMessage);
      return;
    }

    if (data) push(`/${name}/apply/confirmation`);
  };
};
