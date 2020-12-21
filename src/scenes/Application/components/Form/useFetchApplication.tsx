import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { EncodedUrlNameParams } from '@constants';
import useQuery from '@hooks/useQuery';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_APPLICATION, GetApplicationResult } from '../../Application.gql';

export default (): boolean => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { push } = useHistory();
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;

  // Retreive the form from the server.
  const { data: community, error, loading } = useQuery<
    GetApplicationResult,
    EncodedUrlNameParams
  >({
    name: 'getApplication',
    query: GET_APPLICATION,
    variables: { encodedUrlName }
  });

  useEffect(() => {
    if (!community) return;

    // Merge the data into the front-end state.
    const { description, title } = community.application;

    mergeEntities({
      data: {
        ...community,
        applicationDescription: description,
        applicationTitle: title
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
