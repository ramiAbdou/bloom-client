import deepequal from 'fast-deep-equal';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '@atoms/Button';
import Separator from '@atoms/Separator';
import StatusTag from '@atoms/Tags/StatusTag';
import { ModalType } from '@constants';
import ActionContainer from '@containers/ActionContainer/ActionContainer';
import Card from '@containers/Card/Card';
import Row from '@containers/Row';
import useMutation from '@hooks/useMutation';
import Toggle from '@molecules/Toggle/Toggle';
import { IMember, IMemberType } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { UPDATE_AUTO_RENEW, UpdateAutoRenewArgs } from './Membership.gql';

const CurrentPlanCardHeader: React.FC = () => {
  const isDuesActive: boolean =
    useStoreState(({ db }) => db.member?.duesStatus) === 'ACTIVE';

  return (
    <Row spaceBetween>
      <h3>Current Plan</h3>
      <StatusTag positive={isDuesActive}>
        {isDuesActive ? 'ACTIVE' : 'INACTIVE'}
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
    useStoreState(({ db }) => db.member?.duesStatus) === 'ACTIVE';

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { url } = useRouteMatch();
  const { push } = useHistory();

  const onPrimaryClick = () => showModal(ModalType.PAY_DUES);
  const onSecondaryClick = () => push(`${url}/change`);

  return (
    <ActionContainer equal={!isDuesActive}>
      {!isDuesActive && (
        <Button primary onClick={onPrimaryClick}>
          Pay Dues
        </Button>
      )}

      <Button fill secondary onClick={onSecondaryClick}>
        Change Plan
      </Button>
    </ActionContainer>
  );
};

const CurrentPlanCardToggle: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member?.autoRenew);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateAutoRenew] = useMutation<IMember, UpdateAutoRenewArgs>({
    name: 'updateAutoRenew',
    query: UPDATE_AUTO_RENEW,
    schema: Schema.MEMBER,
    variables: { status: !autoRenew }
  });

  const onChange = async () => {
    const { data } = await updateAutoRenew();
    const statusText = data.autoRenew ? 'on' : 'off';
    showToast({ message: `Membership auto-renewal turned ${statusText}.` });
  };

  return (
    <Toggle on={autoRenew} title="Auto Renew Membership" onChange={onChange} />
  );
};

const CurrentPlanCard: React.FC = () => (
  <Card className="s-membership-card s-membership-card--plan">
    <CurrentPlanCardHeader />
    <CurrentPlanCardContent />
    <CurrentPlanCardActionContainer />
    <Separator margin={16} />
    <CurrentPlanCardToggle />
  </Card>
);

export default CurrentPlanCard;
