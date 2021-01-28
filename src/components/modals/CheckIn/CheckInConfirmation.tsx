import deline from 'deline';
import React from 'react';

import StoryPage from '@organisms/Story/StoryPage';

const CheckInConfirmation: React.FC = () => {
  return (
    <StoryPage
      confirmation
      branchId="GUEST_CONFIRMATION"
      branches={{
        GUEST_CONFIRMATION: {
          description: deline`
            We just emailed you an RSVP confirmation. You'll get a join link 30
            minutes before the event starts.
          `,
          title: `RSVP Registered`
        }
      }}
    />
  );
};

export default CheckInConfirmation;
