import React from 'react';

import { gql } from '@apollo/client';
import StoryPage from '@components/organisms/Story/StoryPage';
import { ComponentWithFragments } from '@util/constants';
import { IApplication } from '@util/constants.entities';
import ApplicationMainPageForm from './ApplicationMainPageForm';

const ApplicationMainPage: ComponentWithFragments<IApplication> = ({
  data: application
}) => (
  <StoryPage
    description={application.description}
    iconUrl={application.community.logoUrl}
    id="APPLICATION_MAIN"
    title={application.title}
  >
    <ApplicationMainPageForm data={application} />
  </StoryPage>
);

ApplicationMainPage.fragment = gql`
  fragment ApplicationMainPageFragment on applications {
    description
    title

    community {
      id
      logoUrl
      primaryColor
    }

    ...ApplicationMainPageFormFragment
  }
  ${ApplicationMainPageForm.fragment}
`;

export default ApplicationMainPage;
