/**
 * @fileoverview Components: FormContent
 * @author Rami Abdou
 */

import React from 'react';

import Form from './Form.store';
import FormItem from './FormItem';

export default () => (
  <>
    {Form.useStoreState((store) => store.items)?.map((props) => (
      <FormItem key={props.title} {...props} />
    ))}
  </>
);
