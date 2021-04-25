import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { communityIdVar, isLoaderShowingVar } from 'src/App.reactive';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Story from '@components/organisms/Story/Story';
import useFindOne from '@gql/hooks/useFindOne';
import { UrlNameProps } from '@util/constants';
import { IApplication } from '@util/constants.entities';
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

  console.log(data, error);

  // const { data: application, loading } = useFindOne(IApplication, {
  //   fields: [
  //     'id',
  //     'community.id',
  //     'community.logoUrl',
  //     'community.name',
  //     'community.primaryColor',
  //     'community.urlName',
  //     'community.communityIntegrations.id',
  //     'community.communityIntegrations.communityId',
  //     'community.communityIntegrations.stripeAccountId',
  //     'community.memberTypes.amount',
  //     'community.memberTypes.id',
  //     'community.memberTypes.name',
  //     'community.memberTypes.recurrence',
  //     'description',
  //     'rankedQuestions.id',
  //     'rankedQuestions.rank',
  //     'rankedQuestions.application.id',
  //     'rankedQuestions.question.category',
  //     'rankedQuestions.question.description',
  //     'rankedQuestions.question.id',
  //     'rankedQuestions.question.options',
  //     'rankedQuestions.question.required',
  //     'rankedQuestions.question.title',
  //     'rankedQuestions.question.type',
  //     'rankedQuestions.question.community.id',
  //     'title'
  //   ],
  //   where: { community: { urlName } }
  // });

  // useEffect(() => {
  //   if (application.id) communityIdVar(application.community.id);
  // }, [application]);

  useEffect(() => {
    isLoaderShowingVar(loading);
  }, [loading]);

  if (loading) return null;
  if (error) return <Redirect to="/login" />;

  const application: IApplication = data?.applications?.length
    ? data?.applications[0]
    : null;

  return (
    <div className="s-application-ctr">
      <Story>
        {application && <ApplicationMainPage data={application} />}
        {/* <ApplicationConfirmationPage /> */}
      </Story>
    </div>
  );
};

export default Application;
