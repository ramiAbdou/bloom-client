import React from 'react';

import { useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';
import ExpandedDetails, { ExpandedDetailProps } from './ExpandedDetails';

export default () => {
  const listName = useStoreState(
    ({ integrations }) => integrations.mailchimpListName
  );

  const listId = useStoreState(
    ({ integrations }) => integrations.mailchimpListId
  );

  const details: ExpandedDetailProps[] = [
    { label: 'Audience/List Name', value: listName },
    { label: 'Audience/List ID', value: listId }
  ];

  return (
    <ExpandedDetails details={details} logo={mailchimp} name="Mailchimp" />
  );
};
