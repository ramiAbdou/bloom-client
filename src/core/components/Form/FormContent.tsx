import React from 'react';

import FormItem from './components/FormItem';
import Form from './Form.store';
import { FormItemData } from './Form.types';

/**
 * Maps all of the store's items to React components, based on their question
 * types.
 */
export default () => (
  <>
    {Form.useStoreState(({ items }) => items)?.map((props: FormItemData) => (
      <FormItem key={props.title} {...props} />
    ))}
  </>
);
