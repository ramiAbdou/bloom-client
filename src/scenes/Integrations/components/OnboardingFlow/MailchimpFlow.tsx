/**
 * @fileoverview Component: Mailchimp Flow
 * @author Rami Abdou
 */

import React, { useEffect, useMemo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import Modal from '@components/Modal/Modal';
import { ConfirmationModalOptions } from '@components/Modal/Modal.store';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';

const Content = () => {
  const FLOW_ID = 'MAILCHIMP-FLOW';

  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);

  useEffect(() => {
    const options: ConfirmationModalOptions = {
      body: <FormContent />,
      header: (
        <>
          <img
            alt="Mailchimp Icon"
            className="s-integrations-icon--lg"
            src={mailchimp}
          />

          <h1>Integrate with Mailchimp</h1>
        </>
      ),
      outlineButton: (
        <OutlineButton title="Cancel" onClick={() => closeModal()} />
      ),
      primaryButton: <PrimaryButton disabled={!isCompleted} title="Finish" />
    };

    showModal({ id: FLOW_ID, options, type: 'CONFIRMATION' });
  }, []);

  return null;
};

export default () => {
  const FLOW_ID = 'MAILCHIMP-FLOW';

  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);

  const shouldShowModal = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  return (
    <Form.Provider
      initialData={{
        itemCSS: 's-integrations-form-item',
        questions: [
          {
            description: `Choose the Mailchimp Audience/List ID that you would like new members to automatically be added to upon joining your community.`,
            options: ['Option #1', 'Option #2'],
            required: true,
            title: 'Select Audience/List ID',
            type: 'MULTIPLE_CHOICE'
          }
        ]
      }}
    >
      <Content />
      <Modal isShowing={shouldShowModal} />{' '}
    </Form.Provider>
  );
};
