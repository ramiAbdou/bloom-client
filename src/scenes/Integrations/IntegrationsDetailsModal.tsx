import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { QuestionType } from '@util/constants';
import { ICommunityIntegrations } from '@util/constants.entities';

interface IntegrationsDetail {
  label: string;
  value: string;
}

const useIntegrationsDetails = (name: string): IntegrationsDetail[] => {
  const communityId: string = useReactiveVar(communityIdVar);

  // const mailchimpListName: string = useStoreState(
  //   ({ db }) => db.communityIntegrations.mailchimpListName
  // );

  const { data: communityIntegrations, loading } = useFindOne(
    ICommunityIntegrations,
    {
      fields: ['mailchimpListId', 'stripeAccountId'],
      where: { communityId }
    }
  );

  if (loading) return [];

  if (name === 'Mailchimp') {
    return [
      // { label: 'Audience/List Name', value: mailchimpListName },
      // { label: 'Audience/List Name', value: 'Mailchimp' },
      {
        label: 'Audience/List ID',
        value: communityIntegrations.mailchimpListId
      }
    ];
  }

  if (name === 'Stripe') {
    return [
      { label: 'Account ID', value: communityIntegrations.stripeAccountId }
    ];
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
