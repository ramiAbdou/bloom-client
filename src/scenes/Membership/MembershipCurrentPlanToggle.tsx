import React from 'react';

import Separator from '@atoms/Separator';
import useMutation from '@hooks/useMutation';
import Toggle from '@molecules/Toggle/Toggle';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { UPDATE_AUTO_RENEW, UpdateAutoRenewArgs } from './Membership.gql';

const MembershipCurrentPlanToggle: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member?.autoRenew);

  const isLifetime: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[db.member?.type].recurrence === 'LIFETIME';
  });

  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateAutoRenew] = useMutation<IMember, UpdateAutoRenewArgs>({
    name: 'updateAutoRenew',
    query: UPDATE_AUTO_RENEW,
    schema: Schema.MEMBER,
    variables: { status: !autoRenew }
  });

  if (isLifetime) return null;

  const onChange = async () => {
    const { data } = await updateAutoRenew();
    const statusText = data.autoRenew ? 'on' : 'off';
    showToast({ message: `Membership auto-renewal turned ${statusText}.` });
  };

  return (
    <>
      <Separator margin={16} />
      <Toggle
        on={autoRenew}
        title="Auto Renew Membership"
        onChange={onChange}
      />
    </>
  );
};

export default MembershipCurrentPlanToggle;
