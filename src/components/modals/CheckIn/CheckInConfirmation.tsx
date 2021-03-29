import React from 'react';

import StoryPage from '@organisms/Story/StoryPage';

const CheckInConfirmation: React.FC = () => (
  <StoryPage
    confirmation
    branchId="GUEST_CONFIRMATION"
    branches={{
      ATTENDEE_CONFIRMATION: {
        description: `Thanks for attending the event. You should have been redirected to the virtual event URL.`,
        title: `Attendee Registered`
      },
      GUEST_CONFIRMATION: {
        description: `We just emailed you an RSVP confirmation. You'll get a join link 30 minutes before the event starts.`,
        title: `RSVP Registered`
      },
      LOGIN_LINK: {
        description: `We're sending you a temporary login link. If you have any trouble, you can request another login link or login with Google. You may now close this page.`,
        title: `Login Link Sent`
      }
    }}
  />
);

export default CheckInConfirmation;
