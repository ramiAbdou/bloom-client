import { useLocation } from 'react-router-dom';

import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { IMember, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { SEND_LOGIN_LINK, SendLoginLinkArgs } from './CheckIn.gql';
import { CheckInError } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';

const useSendLoginLink = (): OnFormSubmit => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const { pathname } = useLocation();

  const owner: IUser = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[db.community?.owner];
    return db.byUserId[member?.user];
  });

  const setCurrentPage = StoryStore.useStoreActions(
    (store) => store.setCurrentPage
  );

  const [sendLoginLink] = useMutation<boolean, SendLoginLinkArgs>({
    operation: 'sendLoginLink',
    query: SEND_LOGIN_LINK
  });

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    const email = items.EMAIL?.value;

    const { error } = await sendLoginLink({
      communityId,
      email,
      pathname: communityId && pathname
    });

    if (error) {
      setError(getCheckInErrorMessage({ error: error as CheckInError, owner }));
      return;
    }

    setCurrentPage({ branchId: 'LOGIN_LINK', id: 'CONFIRMATION' });
  };

  return onSubmit;
};

export default useSendLoginLink;
