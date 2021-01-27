import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import IntegrationsStore from '@scenes/Integrations/Integrations.store';
import { IIntegrations } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from './images/mailchimp.png';
import useMailchimpSubmit from './useMailchimpSubmit';

const MailchimpModalActionContainer: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onSecondaryClick = () => closeModal();

  return (
    <Row>
      <SubmitButton fill={false} large={false} loadingText="Finishing...">
        Finish
      </SubmitButton>

      <Button secondary onClick={onSecondaryClick}>
        Cancel
      </Button>
    </Row>
  );
};

const MailchimpModalContent: React.FC = () => {
  const mailchimpLists = useStoreState(
    ({ db }) => db.integrations.mailchimpLists
  );

  return (
    <>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1 style={{ marginBottom: -24 }}>Finish Integrating Mailchimp</h1>

      <FormItem
        required
        description="Choose the Mailchimp Audience/List that you would like
          new members to automatically be added to upon joining your
          community."
        options={mailchimpLists.map(({ name }) => name)}
        title="Select Audience/List ID"
        type="MULTIPLE_CHOICE"
      />

      <MailchimpModalActionContainer />
    </>
  );
};

const MailchimpModal: React.FC = () => {
  const { mailchimpListId, mailchimpLists } = useStoreState(
    ({ db }) => db.integrations,
    deepequal
  ) as IIntegrations;

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const flow = IntegrationsStore.useStoreState((store) => store.flow);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  const onSubmit = useMailchimpSubmit();

  const shouldShowModal: boolean =
    flow === 'MAILCHIMP_FORM' && !mailchimpListId && !!mailchimpLists?.length;

  useEffect(() => {
    if (shouldShowModal) showModal(ModalType.MAILCHIMP_FLOW);
  }, [shouldShowModal]);

  const onClose = () => setFlow(null);

  return (
    <Modal id={ModalType.MAILCHIMP_FLOW} onClose={onClose}>
      <Form className="s-integrations-onboarding-form" onSubmit={onSubmit}>
        <MailchimpModalContent />
      </Form>
    </Modal>
  );
};

export default MailchimpModal;
