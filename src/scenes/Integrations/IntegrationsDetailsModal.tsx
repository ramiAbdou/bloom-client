import React from 'react';

import Button from '@components/atoms/Button/Button';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { ICommunityIntegrations } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { QuestionType } from '@util/constants';

interface IntegrationsDetail {
  label: string;
  value: string;
}

const useIntegrationsDetails = (name: string): IntegrationsDetail[] => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  // const mailchimpListName: string = useStoreState(
  //   ({ db }) => db.communityIntegrations.mailchimpListName
  // );

  const { mailchimpListId, stripeAccountId } = useFindOne(
    ICommunityIntegrations,
    {
      fields: ['mailchimpListId', 'stripeAccountId'],
      where: { communityId }
    }
  );

  if (name === 'Mailchimp') {
    return [
      // { label: 'Audience/List Name', value: mailchimpListName },
      // { label: 'Audience/List Name', value: 'Mailchimp' },
      { label: 'Audience/List ID', value: mailchimpListId }
    ];
  }

  if (name === 'Stripe') {
    return [{ label: 'Account ID', value: stripeAccountId }];
  }
  return [];
};

const IntegrationsDetailsModal: React.FC = () => {
  const { name, logo } = useStoreState(({ modal }) => modal.metadata ?? {});
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const details: IntegrationsDetail[] = useIntegrationsDetails(name);

  return (
    <>
      <img
        alt="Integration Logo"
        className="br-xs s-integrations-icon--lg"
        src={logo}
      />

      <h1>{name} Integration Details</h1>

      <QuestionBox
        className="mb-md--nlc"
        items={details.map(({ label, value }) => {
          return {
            title: label,
            type: QuestionType.MULTIPLE_CHOICE,
            value
          };
        })}
      />

      <Button secondary onClick={() => closeModal()}>
        Close
      </Button>
    </>
  );
};

export default IntegrationsDetailsModal;
