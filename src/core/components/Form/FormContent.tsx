/**
 * @fileoverview Components: FormContent
 * @author Rami Abdou
 */

import React from 'react';

import Form from './Form.store';
import { FormItemData } from './Form.types';
import FormItem from './FormItem';

export default () => (
  <>
    {Form.useStoreState(({ items }) => items)?.map((props: FormItemData) => (
      <FormItem key={props.title} {...props} />
    ))}
  </>
);
