import deline from 'deline';
import React from 'react';

import StoryPage from '@organisms/Story/StoryPage';

const CheckInConfirmation: React.FC = () => {
  return (
    <StoryPage
      confirmation
      branchId="GUEST_CONFIRMATION"
      branches={{
        ATTENDEE_CONFIRMATION: {
          description: deline`
            Thanks for attending the event. You should have been redirected to
            the virtual event URL.
          `,
          title: `Attendee Registered`
        },
        GUEST_CONFIRMATION: {
          description: deline`
            We just emailed you an RSVP confirmation. You'll get a join link 30
            minutes before the event starts.
          `,
          title: `RSVP Registered`
        },
        LOGIN_LINK: {
          description: deline`
            We just sent you a temporary login link. If you have any trouble,
            you can request another login link or login with Google. You may
            now close this page.
          `,
          title: `Login Link Sent`
        }
      }}
    />
  );
};

export default CheckInConfirmation;
