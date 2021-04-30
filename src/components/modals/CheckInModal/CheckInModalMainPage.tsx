import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import { gql } from '@apollo/client';
import {
  useStory,
  useStorySelector
} from '@components/organisms/Story/Story.state';
import StoryPage from '@components/organisms/Story/StoryPage';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import { ErrorContext } from '@util/constants.errors';
import CheckInModalMemberBranch from './CheckInModalMemberBranch';
import CheckInModalNonMemberBranch from './CheckInModalNonMemberBranch';

interface CheckInModalMainPageProps {
  lock?: boolean;
}

const CheckInModalMainPage: ComponentWithFragments<
  IEvent,
  CheckInModalMainPageProps
> = ({ data: event, lock }) => {
  const [{ pageId }, storyDispatch] = useStory();

  const branchId: string = useStorySelector(
    ({ pages }) => pages.find((page) => page.id === 'CHECK_IN_MAIN')?.branchId
  );

  const hasCookieError: boolean = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  useEffect(() => {
    if (hasCookieError && !!branchId && pageId !== 'CHECK_IN_MAIN') {
      storyDispatch({
        branchId: 'FINISH_MEMBER',
        pageId: 'CHECK_IN_MAIN',
        type: 'SET_CURRENT_PAGE'
      });
    }
  }, [hasCookieError, pageId]);

  const branches = {
    FINISH_ATTENDEE: {
      description:
        "We'll redirect you to the event when finished with the form.",
      title: 'Finish Checking-In'
    },
    FINISH_GUEST: {
      description:
        "We'll send you an email with a link to join the event 30 minutes before the event's start time.",
      title: 'Finish Checking-In'
    },
    FINISH_MEMBER: {
      description:
        lock &&
        'You need to be a member to view this event. Sign in to continue.',
      title: 'Sign In to Continue'
    }
  };

  return (
    <StoryPage branchId="FINISH_MEMBER" branches={branches} id="CHECK_IN_MAIN">
      <CheckInModalMemberBranch show={branchId === 'FINISH_MEMBER'} />

      <CheckInModalNonMemberBranch
        data={event}
        show={branchId === 'FINISH_GUEST' || branchId === 'FINISH_ATTENDEE'}
      />
    </StoryPage>
  );
};

CheckInModalMainPage.fragment = gql`
  fragment CheckInModalMainPageFragment on events {
    ...CheckInModalNonMemberBranchFragment
  }
  ${CheckInModalNonMemberBranch.fragment}
`;

export default CheckInModalMainPage;
