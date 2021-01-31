import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import Story from '@organisms/Story/Story';
import { GET_APPLICATION } from '@scenes/Application/Application.gql';
import { ICommunityApplication } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import ApplicationChooseTypePage from './ApplicationChooseType';
import ApplicationConfirmationPage from './ApplicationConfirmation';
import ApplicationMainPage from './ApplicationMain';
import ApplicationReviewPage from './ApplicationReview';

const Application: React.FC = () => {
  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);
  const { urlName } = useParams() as UrlNameProps;

  const { data, error, loading } = useQuery<
    ICommunityApplication,
    UrlNameProps
  >({
    name: 'getApplication',
    query: GET_APPLICATION,
    schema: Schema.COMMUNITY_APPLICATION,
    variables: { urlName }
  });

  // @ts-ignore b/c community is entire entity, not ID.
  const communityId = data?.community?.id;

  useEffect(() => {
    if (communityId) setActiveCommunity(communityId);
  }, [communityId]);

  if (error) return <Redirect to="/login" />;
  if (loading) return <Loader />;

  return (
    <div className="s-application-ctr">
      <Story>
        <ApplicationMainPage />
        <ApplicationChooseTypePage />
        <ApplicationReviewPage />
        <ApplicationConfirmationPage />
      </Story>
    </div>
  );
};

export default Application;
