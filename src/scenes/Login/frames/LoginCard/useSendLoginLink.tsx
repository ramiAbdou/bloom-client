import { useManualQuery } from 'graphql-hooks';

import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import { getGraphQLError } from '@util/util';
import { SEND_TEMPORARY_LOGIN_LINK } from '../../Login.gql';
import Login from '../../Login.store';

export default (): OnFormSubmit => {
  const setEmail = Login.useStoreActions((store) => store.setEmail);

  const setHasLoginLinkSent = Login.useStoreActions(
    (store) => store.setHasLoginLinkSent
  );

  const [sendTemporaryLoginLink] = useManualQuery(SEND_TEMPORARY_LOGIN_LINK);

  return async ({ items, setErrorMessage, setIsLoading }: OnFormSubmitArgs) => {
    const email = items.find(({ category }) => category === 'EMAIL')?.value;

    // Manually set the isLoading variable to true.
    setIsLoading(true);
    const { error } = await sendTemporaryLoginLink({ variables: { email } });
    setIsLoading(false);

    if (error) {
      const errorMessage = getGraphQLError(error);
      setErrorMessage(errorMessage);
      return;
    }

    setEmail(email);
    setHasLoginLinkSent(true);
  };
};
