/**
 * @fileoverview Component: Mailchimp Flow
 * @author Rami Abdou
 */

import React from 'react';

import Form, { formatQuestions, formModel } from '@components/Form/Form.store';
import { useStoreState } from '@store/Store';
import Content from './Content';

export default () => {
  const isMailchimpAuthenticated = useStoreState(
    ({ integrations }) => integrations?.isMailchimpAuthenticated
  );

  const isMailchimpCompleted = useStoreState(
    ({ integrations }) => !!integrations?.mailchimpListId
  );

  const options = useStoreState(
    ({ integrations }) => integrations?.mailchimpLists ?? []
  );

  // This will only be the case if the user loads the page with the query
  // string flow=[name] in the URL without properly going to the backend.
  if (isMailchimpCompleted || !options.length) return null;

  return (
    <Form.Provider
      runtimeModel={{
        ...formModel,
        itemCSS: 's-integrations-modal-item',
        items: formatQuestions([
          {
            completed: isMailchimpAuthenticated,
            description: `Log in with your Mailchimp account.`,
            required: true,
            title: 'Step 1: Authorize Your Mailchimp Account',
            type: 'CUSTOM'
          },
          {
            description: `Choose the Mailchimp Audience/List that you would like
            new members to automatically be added to upon joining your
            community.`,
            options: options.map(({ name }) => name),
            required: true,
            title: 'Step 2: Select Audience/List ID',
            type: 'MULTIPLE_CHOICE'
          }
        ])
      }}
    >
      <Content />
    </Form.Provider>
  );
};
