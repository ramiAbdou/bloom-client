import deepequal from 'fast-deep-equal';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Separator from '@atoms/Separator';
import StatusTag from '@atoms/Tags/StatusTag';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import useMutation from '@hooks/useMutation';
import Toggle from '@molecules/Toggle/Toggle';
import { IMember, IMemberType } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { UPDATE_AUTO_RENEW, UpdateAutoRenewArgs } from './Membership.gql';

const CurrentPlanCardHeader: React.FC = () => {
  const isDuesActive: boolean =
    useStoreState(({ db }) => db.member?.duesStatus) === 'Active';

  return (
    <Row spaceBetween>
      <h3>Current Plan</h3>
      <StatusTag positive={isDuesActive}>
        {isDuesActive ? 'Active' : 'Inactive'}
      </StatusTag>
    </Row>
  );
};

const CurrentPlanCardContent: React.FC = () => {
  const currentType: IMemberType = useStoreState(({ db }) => {
    return db.entities.types.byId[db.member.type];
  }, deepequal);

  if (!currentType) return null;

  const { amount, name, recurrence } = currentType;

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount / 100}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'Per Year'],
    [recurrence === 'MONTHLY', 'Per Month'],
    [recurrence === 'LIFETIME', 'Lifetime']
  ]);

  return (
    <>
      <p>
        <span>{amountString}</span>
        <span>{recurrenceString}</span>
      </p>

      <p>{name}</p>
    </>
  );
};

const CurrentPlanCardActionContainer: React.FC = () => {
  const isDuesActive: boolean =
    useStoreState(({ db }) => db.member?.duesStatus) === 'Active';

  const isLifetime: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[db.member?.type].recurrence === 'LIFETIME';
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { url } = useRouteMatch();
  const { push } = useHistory();

  if (isDuesActive && isLifetime) return null;

  const onPrimaryClick = () => showModal(ModalType.PAY_DUES);
  const onSecondaryClick = () => push(`${url}/change`);

  return (
    <Row equal={!isDuesActive}>
      {!isDuesActive && (
        <Button primary onClick={onPrimaryClick}>
          Pay Dues
        </Button>
      )}

      <Button fill secondary onClick={onSecondaryClick}>
        Change Plan
      </Button>
    </Row>
  );
};

const CurrentPlanCardToggle: React.FC = () => {
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

const CurrentPlanCard: React.FC = () => (
  <Card className="s-membership-card s-membership-card--plan">
    <CurrentPlanCardHeader />
    <CurrentPlanCardContent />
    <CurrentPlanCardActionContainer />
    <CurrentPlanCardToggle />
  </Card>
);

export default CurrentPlanCard;
