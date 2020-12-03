import React from 'react';

import { uuid } from '@util/util';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';
import FormItem from '../FormItem';

export default () => (
  <>
    {Form.useStoreState(({ items }) => items)?.map((props: FormItemData) => (
      <FormItem key={uuid()} {...props} />
    ))}
  </>
);
