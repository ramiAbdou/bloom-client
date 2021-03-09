import React from 'react';

import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import Form from '@organisms/Form/Form';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/events';
import mailchimp from './images/mailchimp.png';
import useMailchimpSubmit from './useMailchimpSubmit';

const MailchimpModalActionContainer: React.FC = () => {
  return (
    <Row spacing="xs">
      <SubmitButton fill={false} large={false} loadingText="Finishing...">
        Finish
      </SubmitButton>

      <ModalCloseButton />
    </Row>
  );
};

const MailchimpModalContent: React.FC = () => {
  const { data, loading } = useQuery({
    fields: ['id', { mailchimpLists: ['id', 'name'] }, { community: ['id'] }],
    operation: QueryEvent.GET_COMMUNITY_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  if (loading || !data.mailchimpLists?.length) return null;

  return (
    <>
      <img
        alt="Mailchimp Icon"
        className="br-xs s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1>Finish Integrating Mailchimp</h1>

      <FormMultipleChoice
        description="Choose the Mailchimp Audience/List that you would like new members to automatically be added to upon joining your community."
        id="MAILCHIMP_LIST_ID"
        options={data.mailchimpLists?.map(({ name }) => name)}
        title="Select Audience/List ID"
      />

      <MailchimpModalActionContainer />
    </>
  );
};

const IntegrationsMailchimpModal: React.FC = () => {
  const onSubmit = useMailchimpSubmit();

  return (
    <Form onSubmit={onSubmit}>
      <MailchimpModalContent />
    </Form>
  );
};

export default IntegrationsMailchimpModal;
