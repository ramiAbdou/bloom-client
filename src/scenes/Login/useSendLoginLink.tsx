import { useHistory, useRouteMatch } from 'react-router-dom';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import {
  SEND_TEMPORARY_LOGIN_LINK,
  SendTemporaryLoginLinkArgs
} from './Login.gql';
import { LoginError } from './Login.types';
import { getLoginErrorMessage } from './Login.util';

const useSendLoginLink = (): OnFormSubmit => {
  const { push } = useHistory();
  const { url } = useRouteMatch();

  const [sendTemporaryLoginLink] = useMutation<
    boolean,
    SendTemporaryLoginLinkArgs
  >({
    name: 'sendTemporaryLoginLink',
    query: SEND_TEMPORARY_LOGIN_LINK
  });

  const onSubmit = async ({
    items,
    setErrorMessage,
    setIsLoading
  }: OnFormSubmitArgs) => {
    const email = items.find(({ category }) => category === 'EMAIL')?.value;

    setIsLoading(true);
    const { error } = await sendTemporaryLoginLink({ email });
    setIsLoading(false);

    if (error) {
      setErrorMessage(getLoginErrorMessage(error as LoginError));
      return;
    }

    push(`${url}/confirmation`);
  };

  return onSubmit;
};

export default useSendLoginLink;
