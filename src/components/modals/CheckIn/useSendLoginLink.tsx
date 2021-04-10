import { useLocation } from 'react-router-dom';

import { IMember, MemberRole } from '@db/db.entities';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import StoryStore from '@components/organisms/Story/Story.store';
import { useStoreState } from '@store/Store';
import { ErrorType } from '@util/constants.errors';
import { MutationEvent } from '@util/constants.events';
import { SendLoginLinkArgs } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';

const useSendLoginLink = (): OnFormSubmitFunction => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const { pathname } = useLocation();

  const setCurrentPage = StoryStore.useStoreActions(
    (state) => state.setCurrentPage
  );

  const [sendLoginLink] = useBloomMutation<boolean, SendLoginLinkArgs>({
    operation: MutationEvent.SEND_LOGIN_LINK,
    types: {
      communityId: { required: false },
      email: { required: true },
      pathname: { required: false }
    }
  });

  const onSubmit = async ({ gql, items, setError }: OnFormSubmitArgs) => {
    const email: string = items.EMAIL?.value as string;

    const { error } = await sendLoginLink({
      communityId,
      email,
      pathname: communityId && pathname
    });

    const owner: IMember = await gql.findOne(IMember, {
      fields: ['email', 'firstName', 'lastName'],
      where: { community: { id: communityId }, role: MemberRole.OWNER }
    });

    if (error) {
      setError(getCheckInErrorMessage({ error: error as ErrorType, owner }));

      return;
    }

    setCurrentPage({ branchId: 'LOGIN_LINK', id: 'CONFIRMATION' });
  };

  return onSubmit;
};

export default useSendLoginLink;
