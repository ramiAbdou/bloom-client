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
        description: `We just emailed you an RSVP confirmation. In that email, you will find a "Join Event" button that you can click to join the event up to 10 minutes before the event. You can also come back to this page to the join the event up to 10 minutes before the event.`,
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
