import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { useStoreActions, useStoreState } from '@store/Store';
import { openHref } from '@util/util';

const useVerifyIndividualEventToken = () => {
  const token = new URLSearchParams(window.location.search).get('token');

  const videoUrl = useStoreState(({ db }) => db.event?.videoUrl);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { push } = useHistory();

  const [verifyEventJoinToken, result] = useMutation<boolean>({
    operation: 'verifyEventJoinToken',
    types: { token: { required: true } },
    variables: { token }
  });

  useEffect(() => {
    if (!token || !videoUrl) return;

    (async () => {
      const { data: isVerified, error } = await verifyEventJoinToken();

      if (error) showModal({ id: ModalType.EVENT_ERROR, metadata: error });
      if (isVerified) openHref(videoUrl, false);

      push(window.location.pathname);
    })();
  }, [token, videoUrl]);

  return result;
};

export default useVerifyIndividualEventToken;
