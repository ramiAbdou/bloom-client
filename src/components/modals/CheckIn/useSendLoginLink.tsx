import { useHistory, useRouteMatch } from 'react-router-dom';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import {
  SEND_TEMPORARY_LOGIN_LINK,
  SendTemporaryLoginLinkArgs
} from './CheckIn.gql';
import { CheckInError } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';

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

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const email = items.find(({ category }) => category === 'EMAIL')?.value;
    const { error } = await sendTemporaryLoginLink({ email });

    if (error) {
      setErrorMessage(getCheckInErrorMessage({ error: error as CheckInError }));
      return;
    }

    push(`${url}/confirmation`);
  };

  return onSubmit;
};

export default useSendLoginLink;
