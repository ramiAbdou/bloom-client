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
import Toggle from '@molecules/Toggle/Toggle';
import { IMemberType } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { UPDATE_AUTO_RENEW } from './Membership.gql';
import useUpdateAutoRenew from './useUpdateAutoRenew';

const CurrentPlanCardHeader: React.FC = () => {
  const isDuesActive: boolean =
    useStoreState(({ db }) => db.member?.duesStatus) === 'ACTIVE';

  return (
    <Row spaceBetween>
      <h4>Current Plan</h4>
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

  const updateAutoRenew = useUpdateAutoRenew();
  const onChange = () => updateAutoRenew();

  return (
    <Toggle on={autoRenew} title="Auto Renew Membership" onChange={onChange} />
  );
};

const CurrentPlanCard: React.FC = () => (
  <Card className="s-membership-card--plan">
    <CurrentPlanCardHeader />
    <CurrentPlanCardContent />
    <CurrentPlanCardActionContainer />
    <Separator margin={16} />
    <CurrentPlanCardToggle />
  </Card>
);

export default CurrentPlanCard;
