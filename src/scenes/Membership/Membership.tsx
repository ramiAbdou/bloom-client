import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import UpdatePaymentModal from './modals/UpdatePayment/UpdatePayment';
import ChangePlan from './pages/ChangePlan/ChangePlan';
import ManageMembership from './pages/Manage/Manage';

const Membership: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact component={ManageMembership} path={url} />
        <Route exact component={ChangePlan} path={`${url}/change-plan`} />
      </Switch>

      <UpdatePaymentModal />
    </>
  );
};

export default Membership;
