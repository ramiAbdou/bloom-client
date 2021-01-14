import React from 'react';

import Form from '@organisms/Form/Form';
import { useStoreState } from '@store/Store';
import FormNavigation from '../../components/organisms/Form/FormNavigation';
import ApplicationMembershipPage from './ApplicationMembershipPage';
import useApplyForMembership from './useApplyForMembership';

const ApplicationForm: React.FC = () => {
  const title = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.title;
  });

  const description = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.description;
  });

  const applyForMembership = useApplyForMembership();

  if (!title) return null;

  return (
    <div className="s-application-ctr">
      <Form
        className="s-application"
        options={{ multiPage: true }}
        onSubmit={applyForMembership}
      >
        <FormNavigation
          pages={[
            { description, id: 'APPLICATION', title },
            { id: 'SELECT_MEMBERSHIP', title: 'Membership Selection' },
            { id: 'CONFIRMATION', title: 'Confirmation' }
          ]}
        />
        <ApplicationMembershipPage />
      </Form>
    </div>
  );
};

export default ApplicationForm;
