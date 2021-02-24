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
      const { data: isVerified } = await verifyEventJoinToken();
      if (!isVerified) showModal({ id: ModalType.EVENT_HASNT_STARTED });
      else {
        push(window.location.pathname);
        openHref(videoUrl, false);
      }
    })();
  }, [token, videoUrl]);

  return result;
};

export default useVerifyIndividualEventToken;
