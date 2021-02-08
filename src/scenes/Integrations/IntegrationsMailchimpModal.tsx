import deline from 'deline';
import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import ModalStore from '@organisms/Modal/Modal.store';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import IntegrationsStore from '@scenes/Integrations/Integrations.store';
import { IIntegrations } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import mailchimp from './images/mailchimp.png';
import useMailchimpSubmit from './useMailchimpSubmit';

const MailchimpModalActionContainer: React.FC = () => {
  return (
    <Row>
      <SubmitButton fill={false} large={false} loadingText="Finishing...">
        Finish
      </SubmitButton>

      <ModalCloseButton />
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

      <FormMultipleChoice
        description={deline`
          Choose the Mailchimp Audience/List that you would like new members to
          automatically be added to upon joining your community.
        `}
        id="MAILCHIMP_LIST_ID"
        options={mailchimpLists.map(({ name }) => name)}
        title="Select Audience/List ID"
      />

      <MailchimpModalActionContainer />
    </>
  );
};

const IntegrationsMailchimpModal: React.FC = () => {
  const { mailchimpListId, mailchimpLists } = useStoreState(
    ({ db }) => db.integrations,
    deepequal
  ) as IIntegrations;

  const showModal = ModalStore.useStoreActions((store) => store.showModal);
  const flow = IntegrationsStore.useStoreState((store) => store.flow);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  const onSubmit = useMailchimpSubmit();

  const shouldShowModal: boolean =
    flow === 'MAILCHIMP_FORM' && !mailchimpListId && !!mailchimpLists?.length;

  const onClose = () => setFlow(null);

  useEffect(() => {
    if (shouldShowModal) showModal({ id: ModalType.MAILCHIMP_FLOW, onClose });
  }, [shouldShowModal]);

  return (
    <Form className="s-integrations-onboarding-form" onSubmit={onSubmit}>
      <MailchimpModalContent />
    </Form>
  );
};

export default IntegrationsMailchimpModal;
