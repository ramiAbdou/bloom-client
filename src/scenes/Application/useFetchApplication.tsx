import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useQuery from '@hooks/useQuery';
import {
  GET_APPLICATION,
  GetApplicationResult
} from '@scenes/Application/Application.gql';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';

const useFetchApplication = (): boolean => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { push } = useHistory();
  const { urlName } = useParams() as UrlNameProps;

  // Retreive the form from the server.
  const { data: community, error, loading } = useQuery<
    GetApplicationResult,
    UrlNameProps
  >({
    name: 'getApplication',
    query: GET_APPLICATION,
    variables: { urlName }
  });

  useEffect(() => {
    if (!community) return;

    const { application, ...data } = community;

    // Merge the data into the front-end state.
    const { description, questions, title } = application;

    mergeEntities({
      data: {
        ...data,
        applicationDescription: description,
        applicationTitle: title,
        questions
      },
      schema: Schema.COMMUNITY,
      setActiveId: true
    });
  }, [community]);

  useEffect(() => {
    // If there is an error when fetching the application data, then we want to
    // go back to the login page,
    if (error) push('/login');
  }, [error]);

  return loading;
};

export default useFetchApplication;
