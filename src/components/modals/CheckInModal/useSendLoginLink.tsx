import { useLocation } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useMutation, useReactiveVar } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';

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
    // gql,
    // formDispatch,
    items,
    storyDispatch
  }: OnFormSubmitArgs) => {
    const email: string = items.EMAIL?.value as string;

    await sendLoginLink({
      variables: { communityId, email, redirectUrl: communityId && pathname }
    });

    // const owner: IMember = await gql.findOne(IMember, {
    //   fields: ['email', 'firstName', 'lastName'],
    //   where: { community: { id: communityId }, role: MemberRole.OWNER }
    // });

    // if (error) {
    //   formDispatch({
    //     error: getCheckInErrorMessage({ error: error as ErrorType, owner }),
    //     type: 'SET_ERROR'
    //   });

    //   return;
    // }

    storyDispatch({
      branchId: 'LOGIN_LINK',
      pageId: 'CONFIRMATION',
      type: 'SET_CURRENT_PAGE'
    });
  };

  return onSubmit;
};

export default useSendLoginLink;
