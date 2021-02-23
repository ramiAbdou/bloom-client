import { useEffect } from 'react';

import useMutation from '@hooks/useMutation';

const useIndividualEventJoinToken = () => {
  const joinToken = new URLSearchParams(window.location.search).get(
    'joinToken'
  );

  const [verifyEventJoinToken, result] = useMutation<boolean>({
    operation: 'verifyEventJoinToken',
    types: { joinToken: { required: true } },
    variables: { joinToken }
  });

  useEffect(() => {
    if (!joinToken) return;

    (async () => {
      const { data } = await verifyEventJoinToken();

      console.log(data);

      // // If the token is verified, we push to the pathname (essentially just
      // // gets rid of the token attached as a query parameter).
      // if (isVerified) push(window.location.pathname);
    })();
  }, [joinToken]);

  console.log(joinToken);
};

export default useIndividualEventJoinToken;
