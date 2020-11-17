/**
 * @fileoverview Component: Mailchimp Flow
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';
import { GET_MAILCHIMP_LIST_IDS } from '../../Integrations.gql';

const Content = () => {
  const FLOW_ID = 'MAILCHIMP-FLOW';
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);

  useEffect(() => {
    showModal({ id: FLOW_ID });
  }, []);

  const shouldShowModal = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  return (
    <Modal isShowing={shouldShowModal}>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1>Integrate with Mailchimp</h1>
      <FormContent />

      <div className="s-integrations-action-ctr">
        <PrimaryButton disabled={!isCompleted} title="Finish" />
        <OutlineButton title="Cancel" onClick={() => closeModal()} />
      </div>
    </Modal>
  );
};

export default () => {
  const { data, loading, error } = useQuery(GET_MAILCHIMP_LIST_IDS);
  if (loading || error) return null;
  const options = data?.getIntegrations?.integrations?.mailchimpLists ?? [];

  return (
    <Form.Provider
      initialData={{
        itemCSS: 's-integrations-form-item',
        questions: [
          {
            description: `Choose the Mailchimp Audience/List that you would like new members to automatically be added to upon joining your community.`,
            options,
            required: true,
            title: 'Select Audience/List ID',
            type: 'MULTIPLE_CHOICE'
          }
        ]
      }}
    >
      <Content />
    </Form.Provider>
  );
};
