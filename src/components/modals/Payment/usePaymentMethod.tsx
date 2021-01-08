import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { IMember } from '@store/entities';
import LoadingStore from '@store/Loading.store';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_PAYMENT_METHOD } from './Payment.gql';

/**
 * Updates the current loading state. Ensures that state isn't updated if
 * the loading variable is the same as the current state variable.
 *
 * Precondition: This hook must only be called from a child of the
 * LoadingStore.Provider store.
 */
const useUpdateLoading = (loading: boolean) => {
  const currentLoading = LoadingStore.useStoreState((store) => store.loading);
  const setLoading = LoadingStore.useStoreActions((store) => store.setLoading);

  useEffect(() => {
    if (loading !== undefined && loading !== currentLoading) {
      setLoading(loading);
    }
  }, [loading]);
};

const usePaymentMethod = (skipGlobalLoadingState?: boolean) => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, loading } = useQuery<IMember>({
    name: 'getMember',
    query: GET_PAYMENT_METHOD
  });

  useUpdateLoading(skipGlobalLoadingState ? undefined : loading);

  useEffect(() => {
    if (data) mergeEntities({ data, schema: Schema.MEMBER });
  }, [data]);

  return loading;
};

export default usePaymentMethod;
