import { useEffect } from 'react';

import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { useStoreActions } from '@store/Store';

const useVerifyIndividualEventToken = () => {
  const token = new URLSearchParams(window.location.search).get('token');

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const [verifyEventJoinToken, result] = useMutation<boolean>({
    operation: 'verifyEventJoinToken',
    types: { token: { required: true } },
    variables: { token }
  });

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data: isVerified } = await verifyEventJoinToken();

      if (!isVerified) showModal({ id: ModalType.EVENT_HASNT_STARTED });
    })();
  }, [token]);

  return result;
};

export default useVerifyIndividualEventToken;
