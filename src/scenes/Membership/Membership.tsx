import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import PaymentModal from '@modals/Payment/Payment';
import LoadingStore, { loadingModel } from '@store/Loading.store';
import ChangePlan from './ChangePlan/ChangePlan';
import ManageMembership from './Manage/Manage';

const MembershipContent: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact component={ManageMembership} path={url} />
        <Route exact component={ChangePlan} path={`${url}/change-plan`} />
        <Redirect to={url} />
      </Switch>

      <PaymentModal type="CHANGE_PLAN" />
      <PaymentModal type="UPDATE_PAYMENT_METHOD" />
    </>
  );
};

const Membership: React.FC = () => (
  <LoadingStore.Provider runtimeModel={{ ...loadingModel, loading: false }}>
    <MembershipContent />
  </LoadingStore.Provider>
);

export default Membership;
