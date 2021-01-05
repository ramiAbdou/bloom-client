import { useManualQuery } from 'graphql-hooks';

import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { getGraphQLError } from '@util/util';
import { SEND_TEMPORARY_LOGIN_LINK } from '../Login.gql';
import Login from '../Login.store';

const useSendLoginLink = (): OnFormSubmit => {
  const setEmail = Login.useStoreActions((store) => store.setEmail);

  const setHasLoginLinkSent = Login.useStoreActions(
    (store) => store.setHasLoginLinkSent
  );

  const [sendTemporaryLoginLink] = useManualQuery(SEND_TEMPORARY_LOGIN_LINK);

  const onSubmit = async ({
    items,
    setErrorMessage,
    setIsLoading
  }: OnFormSubmitArgs) => {
    const email = items.find(({ category }) => category === 'EMAIL')?.value;

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

  return onSubmit;
};

export default useSendLoginLink;
