import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import useMutation from '@hooks/useMutation';
import Toggle from '@molecules/Toggle/Toggle';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { UpdateMemberArgs } from './Membership.types';

const MembershipCurrentPlanToggle: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member?.autoRenew);

  const isLifetime: boolean = useStoreState(({ db }) => {
    return db.byTypeId[db.member?.type]?.recurrence === 'LIFETIME';
  });

  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateMember] = useMutation<IMember, UpdateMemberArgs>({
    fields: ['id', 'autoRenew'],
    operation: 'updateMember',
    schema: Schema.MEMBER,
    types: { autoRenew: { required: false, type: 'Boolean' } },
    variables: { autoRenew: !autoRenew }
  });

  const onChange = async () => {
    const { data } = await updateMember();
    const statusText = data.autoRenew ? 'on' : 'off';
    showToast({ message: `Membership auto-renewal turned ${statusText}.` });
  };

  return (
    <Show show={!isLifetime}>
      <Separator margin={16} />
      <Toggle
        on={autoRenew}
        title="Auto Renew Membership"
        onChange={onChange}
      />
    </Show>
  );
};

export default MembershipCurrentPlanToggle;
