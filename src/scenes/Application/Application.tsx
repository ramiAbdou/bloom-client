import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { isLoaderShowingVar, setCommunityId } from 'src/App.reactive';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Story from '@components/organisms/Story/Story';
import { UrlNameProps } from '@util/constants';
import { IApplication } from '@util/constants.entities';
import { updateDocumentColors } from '@util/util';
import ApplicationConfirmationPage from './ApplicationConfirmationPage';
import ApplicationMainPage from './ApplicationMainPage';

interface GetApplicationByCommunityUrlNameArgs {
  urlName: string;
}

interface GetApplicationByCommunityUrlNameResult {
  applications: IApplication[];
}

const GET_APPLICATION_BY_COMMUNITY_URL_NAME: DocumentNode = gql`
  query GetApplicationByCommunityUrlName($urlName: String!) {
    applications(where: { community: { urlName: { _eq: $urlName } } }) {
      id
      ...ApplicationMainPageFragment
    }
  }
  ${ApplicationMainPage.fragment}
`;

const Application: React.FC = () => {
  const { urlName } = useParams() as UrlNameProps;

  const { data, error, loading } = useQuery<
    GetApplicationByCommunityUrlNameResult,
    GetApplicationByCommunityUrlNameArgs
  >(GET_APPLICATION_BY_COMMUNITY_URL_NAME, { variables: { urlName } });

  const application: IApplication = data?.applications?.length
    ? data?.applications[0]
    : null;

  console.log(error);

  useEffect(() => {
    if (application?.id) {
      setCommunityId(application.community.id);
      updateDocumentColors(application.community.primaryColor);
    }
  }, [application]);

  useEffect(() => {
    isLoaderShowingVar(loading);
  }, [loading]);

  if (error) return <Redirect to="/login" />;
  if (loading || !application) return null;

  return (
    <div className="s-application-ctr">
      <Story>
        {application && <ApplicationMainPage data={application} />}
        <ApplicationConfirmationPage />
      </Story>
    </div>
  );
};

export default Application;
