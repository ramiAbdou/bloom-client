import { useEffect } from 'react';

import useMutation from '@hooks/useMutation';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { UPDATE_AUTO_RENEW, UpdateAutoRenewArgs } from './Membership.gql';

const useUpdateAutoRenew = () => {
  const autoRenew = useStoreState(({ db }) => db.member.autoRenew);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const [updateAutoRenew, { data }] = useMutation<IMember, UpdateAutoRenewArgs>(
    {
      name: 'updateAutoRenew',
      query: UPDATE_AUTO_RENEW,
      variables: { status: !autoRenew }
    }
  );

  useEffect(() => {
    if (data) mergeEntities({ data, schema: Schema.MEMBER });
  }, [data]);

  return updateAutoRenew;
};

export default useUpdateAutoRenew;
