import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useQuery from '@hooks/useQuery';
import useLoader from '@organisms/Loader/useLoader';
import Story from '@organisms/Story/Story';
import {
  ICommunityApplication,
  IMemberType,
  IQuestion
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import ApplicationChooseTypePage from './ApplicationChooseType';
import ApplicationConfirmationPage from './ApplicationConfirmation';
import ApplicationMainPage from './ApplicationMain';
import ApplicationReviewPage from './ApplicationReview';

const Application: React.FC = () => {
  const setActive = useStoreActions(({ db }) => db.setActive);
  const { urlName } = useParams() as UrlNameProps;

  const { data, error, loading: loading1 } = useQuery<
    ICommunityApplication,
    UrlNameProps
  >({
    fields: [
      'description',
      'id',
      'title',
      {
        community: [
          'autoAccept',
          'id',
          'logoUrl',
          'name',
          'primaryColor',
          'urlName',
          { integrations: ['stripeAccountId'] }
        ]
      }
    ],
    operation: 'getApplication',
    schema: Schema.COMMUNITY_APPLICATION,
    types: { urlName: { required: true } },
    variables: { urlName }
  });

  const { loading: loading2 } = useQuery<IQuestion[]>({
    fields: [
      'category',
      'description',
      'id',
      'inApplication',
      'options',
      'required',
      'title',
      'type',
      { community: ['id'] }
    ],
    operation: 'getQuestions',
    schema: [Schema.QUESTION],
    types: { urlName: { required: false } },
    variables: { urlName }
  });

  const { loading: loading3 } = useQuery<IMemberType[]>({
    fields: [
      'amount',
      'id',
      'isFree',
      'name',
      'recurrence',
      { community: ['id'] }
    ],
    operation: 'getTypes',
    schema: [Schema.MEMBER_TYPE],
    types: { urlName: { required: false } },
    variables: { urlName }
  });

  const loading = loading1 || loading2 || loading3;
  useLoader(loading);

  // @ts-ignore b/c community is entire entity, not ID.
  const communityId = data?.community?.id;

  useEffect(() => {
    if (communityId) setActive({ id: communityId, table: 'communities' });
  }, [communityId]);

  if (error) return <Redirect to="/login" />;
  if (loading) return null;

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
