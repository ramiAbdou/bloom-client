import { useLocation } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import StoryStore from '@components/organisms/Story/Story.store';
import { IMember, MemberRole } from '@core/db/db.entities';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { ErrorType } from '@util/constants.errors';
import { MutationEvent } from '@util/constants.events';
import { SendLoginLinkArgs } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';

const useSendLoginLink = (): OnFormSubmitFunction => {
  const communityId: string = useReactiveVar(communityIdVar);
  const { pathname } = useLocation();

  const setCurrentPage = StoryStore.useStoreActions(
    (state) => state.setCurrentPage
  );

  const [sendLoginLink] = useBloomMutation<boolean, SendLoginLinkArgs>({
    operation: MutationEvent.SEND_LOGIN_LINK,
    types: {
      communityId: { required: false },
      email: { required: true },
      redirectUrl: { required: false }
    }
  });

  const onSubmit = async ({ gql, items, setError }: OnFormSubmitArgs) => {
    const email: string = items.EMAIL?.value as string;

    const { error } = await gql.mutation({
      fields: ['ok'],
      mutationName: 'sendLoginLink'
    });

    // sendLoginLink({
    //   communityId,
    //   email,
    //   redirectUrl: communityId && pathname
    // });

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
