import { useLocation } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useMutation, useReactiveVar } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { getGraphQLError } from '@util/util';

interface SendLoginLinkArgs {
  communityId?: string;
  email: string;
  redirectUrl?: string;
}

interface SendLoginLinkResult {
  ok: boolean;
}

const SEND_LOGIN_LINK: DocumentNode = gql`
  mutation SendLoginLink(
    $communityId: String
    $email: String!
    $redirectUrl: String
  ) {
    sendLoginLink(
      communityId: $communityId
      email: $email
      redirectUrl: $redirectUrl
    ) {
      ok
    }
  }
`;

const useSendLoginLink = (): OnFormSubmitFunction => {
  const [sendLoginLink] = useMutation<SendLoginLinkResult, SendLoginLinkArgs>(
    SEND_LOGIN_LINK
  );

  const communityId: string = useReactiveVar(communityIdVar);
  const { pathname } = useLocation();

  const onSubmit = async ({
    formDispatch,
    items,
    storyDispatch
  }: OnFormSubmitArgs) => {
    const email: string = items.EMAIL?.value as string;

    try {
      await sendLoginLink({
        variables: { communityId, email, redirectUrl: communityId && pathname }
      });

      storyDispatch({
        branchId: 'LOGIN_LINK',
        pageId: 'CONFIRMATION',
        type: 'SET_CURRENT_PAGE'
      });
    } catch (e) {
      formDispatch({ error: getGraphQLError(e), type: 'SET_ERROR' });
    }
  };

  return onSubmit;
};

export default useSendLoginLink;
