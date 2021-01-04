import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import useUpdateLoading from '@hooks/useUpdateLoading';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import {
  GET_PENDING_APPLICATIONS,
  GetPendingApplicantsResult
} from './Applicants.gql';

const useFetchApplicants = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data: community, loading } = useQuery<GetPendingApplicantsResult>({
    name: 'getApplicants',
    query: GET_PENDING_APPLICATIONS
  });

  useUpdateLoading(loading);

  useEffect(() => {
    if (!community) return;

    mergeEntities({
      data: { ...community, questions: community.application.questions },
      schema: Schema.COMMUNITY
    });
  }, [community]);
};

export default useFetchApplicants;
