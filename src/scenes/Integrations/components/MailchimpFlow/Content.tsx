/**
 * @fileoverview Component: Mailchimp Modal Content
 * @author Rami Abdou
 */

import React, { useEffect } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';
import IntegrationsStore from '../../Integrations.store';
import useMailchimpSubmit from './useMailchimpSubmit';

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);
  const submitForm = Form.useStoreState((store) => store.submitForm);

  const { error, loading } = useMailchimpSubmit();
  const MODAL_ID = 'MAILCHIMP_FLOW';

  useEffect(() => {
    showModal({ id: MODAL_ID, onClose: () => setFlow(null) });
  }, []);

  if (error)
    showToast({
      isError: true,
      message: 'Failed to submit. Please try again soon.'
    });

  return (
    <Modal isShowing={isShowing && MODAL_ID === id}>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1 style={{ marginBottom: -24 }}>Integrate with Mailchimp</h1>
      <FormContent />

      <div className="s-integrations-action-ctr">
        <PrimaryButton
          disabled={!isCompleted}
          loading={loading}
          title="Finish"
          onClick={submitForm}
        />
        <OutlineButton title="Cancel" onClick={closeModal} />
      </div>
    </Modal>
  );
};
