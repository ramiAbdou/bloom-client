import { UseClientRequestResult, useQuery } from 'graphql-hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EncodedUrlNameParams } from '@constants';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_MEMBERSHIP_FORM } from '../../Application.gql';

export default (): UseClientRequestResult<any, object> => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const result = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    const { id, application, ...rest } = result.data?.getApplication ?? {};
    if (!id) return;

    mergeEntities({
      data: {
        ...rest,
        applicationDescription: application.description,
        applicationTitle: application.title,
        id,
        questions: application.questions
      },
      schema: Schema.COMMUNITY,
      setActiveId: true
    });
  }, [result]);

  return result;
};
