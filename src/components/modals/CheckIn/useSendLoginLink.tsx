import { useLocation } from 'react-router-dom';

import useManualQuery from '@hooks/useManualQuery';
import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { ErrorType } from '@util/errors';
import { MutationEvent, QueryEvent } from '@util/events';
import { SendLoginLinkArgs } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';

const useSendLoginLink = (): OnFormSubmit => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const { pathname } = useLocation();

  const setCurrentPage = StoryStore.useStoreActions(
    (store) => store.setCurrentPage
  );

  const [getOwner] = useManualQuery<IMember>({
    fields: [
      'id',
      'email',
      'firstName',
      'lastName',
      'role',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_OWNER,
    schema: Schema.MEMBER,
    types: { communityId: { required: true } }
  });

  const [sendLoginLink] = useMutation<boolean, SendLoginLinkArgs>({
    operation: MutationEvent.SEND_LOGIN_LINK,
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
      setError(
        getCheckInErrorMessage({
          error: error as ErrorType,
          owner: communityId ? (await getOwner({ communityId }))?.data : null
        })
      );

      return;
    }

    setCurrentPage({ branchId: 'LOGIN_LINK', id: 'CONFIRMATION' });
  };

  return onSubmit;
};

export default useSendLoginLink;
