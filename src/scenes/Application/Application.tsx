import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import { GET_APPLICATION } from '@scenes/Application/Application.gql';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import ApplicationConfirmationCard from './ApplicationConfirmationCard';
import ApplicationForm from './ApplicationForm';

/**
 * Controls sign-up process and has two different routes:
 * - Member Application Form
 * - Member Application Form Confirmation
 */
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

  return (
    <Switch>
      <Route exact component={ApplicationForm} path="/:urlName/apply" />

      <Route
        exact
        component={ApplicationConfirmationCard}
        path="/:urlName/apply/confirmation"
      />
    </Switch>
  );
};

export default Application;
