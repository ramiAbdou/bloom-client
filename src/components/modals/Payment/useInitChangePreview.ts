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
  const selectedMemberTypeId: string = PaymentStore.useStoreState(
    (state) => state.selectedMemberTypeId
  );

  const modalType: PaymentModalType = PaymentStore.useStoreState(
    (state) => state.type
  );

  const setChangeData = PaymentStore.useStoreActions(
    (state) => state.setChangeData
  );

  const [getChangePreview, result] = useManualQuery<
    GetChangePreviewResult,
    GetChangePreviewArgs
  >({
    fields: ['amount', 'prorationDate'],
    operation: QueryEvent.GET_CHANGE_PREVIEW,
    types: { memberTypeId: { required: true } }
  });

  useEffect(() => {
    if (modalType !== PaymentModalType.CHANGE_MEMBERSHIP) return;

    (async () => {
      const { data } = await getChangePreview({
        memberTypeId: selectedMemberTypeId
      });

      setChangeData({
        changeAmount: data?.amount,
        changeProrationDate: data?.prorationDate
      });
    })();
  }, [modalType, selectedMemberTypeId]);

  return result;
};

export default useInitChangePreview;
