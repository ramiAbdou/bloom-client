import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import { useStory } from '@components/organisms/Story/Story.state';
import StoryStore from '@components/organisms/Story/Story.store';
import StoryPage from '@components/organisms/Story/StoryPage';
import { ErrorContext } from '@util/constants.errors';
import CheckInGuestForm from './CheckInGuestForm';
import CheckInLoginContent from './CheckInLoginContent';

interface CheckInMainPageProps {
  lock?: boolean;
}

const CheckInMainPage: React.FC<CheckInMainPageProps> = ({ lock }) => {
  const [, storyDispatch] = useStory();

  const pageId = StoryStore.useStoreState((state) => state.pageId);

  const branchId = StoryStore.useStoreState(
    ({ getPage }) => getPage('FINISH')?.branchId
  );

  const hasCookieError = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  useEffect(() => {
    if (hasCookieError && !!branchId && pageId !== 'FINISH') {
      storyDispatch({
        branchId: 'FINISH_MEMBER',
        pageId: 'FINISH',
        type: 'SET_CURRENT_PAGE'
      });
    }
  }, [hasCookieError, pageId]);

  return (
    <StoryPage
      branchId="FINISH_MEMBER"
      branches={{
        FINISH_ATTENDEE: {
          description: `We'll redirect you to the event when finished with the form.`,
          title: 'Finish Checking-In'
        },
        FINISH_GUEST: {
          description: `We'll send you an email with a link to join the event 30 minutes before the event's start time.`,
          title: 'Finish Checking-In'
        },
        FINISH_MEMBER: {
          description:
            lock &&
            'You need to be a member to view this event. Sign in to continue.',
          title: 'Sign In to Continue'
        }
      }}
      id="FINISH"
    >
      <CheckInLoginContent show={branchId === 'FINISH_MEMBER'} />
      <CheckInGuestForm
        show={branchId === 'FINISH_GUEST' || branchId === 'FINISH_ATTENDEE'}
      />
    </StoryPage>
  );
};

export default CheckInMainPage;
