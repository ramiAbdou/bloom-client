import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import Form from '@organisms/Form/Form';
import Story from '@organisms/Story/Story';
import { GET_APPLICATION } from '@scenes/Application/Application.gql';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import ApplicationConfirmationPage from './ApplicationFinishPage';
import ApplicationMembershipPage from './ApplicationMembershipPage';
import ApplicationSelectTypePage from './ApplicationSelectTypePage';
import useApplyForMembership from './useApplyForMembership';

const ApplicationContent: React.FC = () => {
  const applyForMembership = useApplyForMembership();

  return (
    <div className="s-application-ctr">
      <Story>
        <Form className="s-application" onSubmit={applyForMembership}>
          <ApplicationMembershipPage />
          <ApplicationSelectTypePage />
          <ApplicationConfirmationPage />
        </Form>
      </Story>
    </div>
  );
};

const Application: React.FC = () => {
  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);
  const { urlName } = useParams() as UrlNameProps;

  const { data, error, loading } = useQuery<ICommunity, UrlNameProps>({
    name: 'getApplication',
    query: GET_APPLICATION,
    schema: Schema.COMMUNITY,
    variables: { urlName }
  });

  const communityId = data?.id;

  useEffect(() => {
    if (communityId) setActiveCommunity(communityId);
  }, [communityId]);

  if (error) return <Redirect to="/login" />;
  if (loading) return <Loader />;
  return <ApplicationContent />;
};

export default Application;
