import { useQuery } from 'graphql-hooks';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { EncodedUrlNameParams } from '@constants';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_MEMBERSHIP_FORM } from '../../Application.gql';

export default (): boolean => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { push } = useHistory();
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;

  // Retreive the form from the server.
  const { data, error, loading } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    const { id, application, ...rest } = data?.getApplication ?? {};
    if (!id) return;

    // Merge the data into the front-end state.
    const { description, questions, title } = application;

    mergeEntities({
      data: {
        ...rest,
        applicationDescription: description,
        applicationTitle: title,
        id,
        questions
      },
      schema: Schema.COMMUNITY,
      setActiveId: true
    });
  }, [data]);

  useEffect(() => {
    // If there is an error when fetching the application data, then we want to
    // go back to the login page,
    if (error) push('/login');
  }, [error]);

  return loading;
};
