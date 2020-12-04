import React from 'react';

import { uuid } from '@util/util';
import FormItem from './components/FormItem';
import Form from './Form.store';
import { FormItemData } from './Form.types';

export default () => (
  <>
    {Form.useStoreState(({ items }) => items)?.map((props: FormItemData) => (
      <FormItem key={uuid()} {...props} />
    ))}
  </>
);
