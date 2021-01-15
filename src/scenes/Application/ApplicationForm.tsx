import React from 'react';

import Form from '@organisms/Form/Form';
import { useStoreState } from '@store/Store';
import FormNavigation from '../../components/organisms/Form/FormNavigation';
import ApplicationMembershipPage from './ApplicationMembershipPage';
import ApplicationSelectTypePage from './ApplicationSelectTypePage';
import useApplyForMembership from './useApplyForMembership';

const ApplicationForm: React.FC = () => {
  const description = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.description;
  });

  const title = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.title;
  });

  const showForm: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const types = db.community?.types;

    const isMoreThanOneType = types?.length > 1;
    const isFirstTypePaid = !!types && !byTypeId[types[0]]?.isFree;

    return isMoreThanOneType || isFirstTypePaid;
  });

  const applyForMembership = useApplyForMembership();

  if (!title) return null;

  const selectTypePages = showForm
    ? [
        {
          description: 'Choose your membership type.',
          id: 'SELECT_TYPE',
          title: 'Membership Selection'
        }
      ]
    : [];

  return (
    <div className="s-application-ctr">
      <Form
        className="s-application"
        options={{ multiPage: true }}
        pages={[
          { description, id: 'APPLICATION', title },
          ...selectTypePages,
          { id: 'CONFIRMATION', title: 'Confirmation' }
        ]}
        onSubmit={applyForMembership}
      >
        <FormNavigation />
        <ApplicationMembershipPage />
        <ApplicationSelectTypePage />
      </Form>
    </div>
  );
};

export default ApplicationForm;
