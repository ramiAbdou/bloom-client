import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { QueryEvent } from '@util/constants.events';
import PaymentStore from './Payment.store';
import {
  GetChangePreviewArgs,
  GetChangePreviewResult,
  PaymentModalType
} from './Payment.types';

const useInitChangePreview = (): QueryResult<GetChangePreviewResult> => {
  const planId: string = PaymentStore.useStoreState((state) => {
    return state.selectedPlanId;
  });

  const modalType: PaymentModalType = PaymentStore.useStoreState((state) => {
    return state.type;
  });

  const setChangeData = PaymentStore.useStoreActions((store) => {
    return store.setChangeData;
  });

  const [getChangePreview, result] = useManualQuery<
    GetChangePreviewResult,
    GetChangePreviewArgs
  >({
    fields: ['amount', 'prorationDate'],
    operation: QueryEvent.GET_CHANGE_PREVIEW,
    types: { memberPlanId: { required: true } }
  });

  useEffect(() => {
    if (modalType !== PaymentModalType.CHANGE_MEMBERSHIP) return;

    (async () => {
      const { data } = await getChangePreview({ memberPlanId: planId });

      setChangeData({
        changeAmount: data?.amount,
        changeProrationDate: data?.prorationDate
      });
    })();
  }, [modalType, planId]);

  return result;
};

export default useInitChangePreview;
