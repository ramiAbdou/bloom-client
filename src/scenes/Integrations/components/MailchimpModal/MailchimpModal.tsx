import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import Form from '@components/Form/Form';
import Modal from '@components/Modal/Modal';
import { ModalType } from '@constants';
import IntegrationsStore from '@scenes/Integrations/Integrations.store';
import { IIntegrations } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import useMailchimpSubmit from '../../hooks/useMailchimpSubmit';
import MailchimpModalContent from './Content';

export default () => {
  const { mailchimpListId, mailchimpLists } = useStoreState(
    ({ db }) => db.integrations,
    deepequal
  ) as IIntegrations;

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  const onSubmitMailchimpList = useMailchimpSubmit();

  useEffect(() => {
    showModal(ModalType.MAILCHIMP_FLOW);
  }, []);

  // This will only be the case if the user loads the page with the query
  // string flow=[name] in the URL without properly going to the backend.
  if (!!mailchimpListId || !mailchimpLists?.length) return null;

  const onClose = () => setFlow(null);

  return (
    <Modal id={ModalType.MAILCHIMP_FLOW} onClose={onClose}>
      <Form
        className="s-integrations-onboarding-form"
        onSubmit={onSubmitMailchimpList}
      >
        <MailchimpModalContent />
      </Form>
    </Modal>
  );
};
