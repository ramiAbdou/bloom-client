import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import PaymentModal from '@modals/Payment/Payment';
import LoadingStore, { loadingModel } from '@store/Loading.store';
import ChangeMembership from './ChangeMembership';
import ManageMembership from './ManageMembership';
import MembershipStore from './Membership.store';

const MembershipContent: React.FC = () => {
  const typeId = MembershipStore.useStoreState((store) => store.selectedTypeId);
  const { url } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact component={ManageMembership} path={url} />
        <Route exact component={ChangeMembership} path={`${url}/change`} />
        <Redirect to={url} />
      </Switch>

      <PaymentModal selectedTypeId={typeId} type="CHANGE_MEMBERSHIP" />
      <PaymentModal selectedTypeId={typeId} type="UPDATE_PAYMENT_METHOD" />
    </>
  );
};

const Membership: React.FC = () => (
  <LoadingStore.Provider runtimeModel={{ ...loadingModel, loading: false }}>
    <MembershipStore.Provider>
      <MembershipContent />
    </MembershipStore.Provider>
  </LoadingStore.Provider>
);

export default Membership;
