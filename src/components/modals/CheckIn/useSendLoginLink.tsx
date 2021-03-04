import { useLocation } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { CheckInError, SendLoginLinkArgs } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';

const useSendLoginLink = (): OnFormSubmit => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const { pathname } = useLocation();

  const setCurrentPage = StoryStore.useStoreActions(
    (store) => store.setCurrentPage
  );

  const [getCommunityOwner] = useManualQuery<ICommunity>({
    fields: [
      'id',
      { owner: ['id', 'email', 'firstName', 'lastName', { user: ['id'] }] }
    ],
    operation: 'getCommunityOwner',
    schema: Schema.COMMUNITY,
    types: { communityId: { required: true } }
  });

  const [sendLoginLink] = useMutation<boolean, SendLoginLinkArgs>({
    operation: 'sendLoginLink',
    types: {
      communityId: { required: false },
      email: { required: true },
      pathname: { required: false }
    }
  });

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    const email = items.EMAIL?.value;

    const { error } = await sendLoginLink({
      communityId,
      email,
      pathname: communityId && pathname
    });

    if (error) {
      const { data } = await getCommunityOwner({ communityId });

      setError(
        getCheckInErrorMessage({
          error: error as CheckInError,
          // @ts-ignore b/c type error.
          owner: data?.owner?.user
        })
      );

      return;
    }

    setCurrentPage({ branchId: 'LOGIN_LINK', id: 'CONFIRMATION' });
  };

  return onSubmit;
};

export default useSendLoginLink;
