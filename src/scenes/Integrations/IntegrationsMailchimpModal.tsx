import React from 'react';

import Row from '@components/containers/Row/Row';
import useCustomQuery from '@gql/hooks/useCustomQuery';
import Form from '@components/organisms/Form/Form';
import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import SubmitButton from '@components/organisms/Form/FormSubmitButton';
import ModalCloseButton from '@components/organisms/Modal/ModalCloseButton';
import mailchimp from './images/mailchimp.png';
import useMailchimpSubmit from './useMailchimpSubmit';

const MailchimpModalActionContainer: React.FC = () => (
  <Row spacing="xs">
    <SubmitButton fill={false} large={false} loadingText="Finishing...">
      Finish
    </SubmitButton>

    <ModalCloseButton />
  </Row>
);

interface GetCommunityIntegrationsResult {
  mailchimpLists: { id: string; name: string }[];
}

const MailchimpModalContent: React.FC = () => {
  const { data, loading } = useCustomQuery<GetCommunityIntegrationsResult>({
    fields: ['id', 'mailchimpLists.id', 'mailchimpLists.name'],
    queryName: 'getCommunityIntegrations'
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
