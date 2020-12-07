import React from 'react';

import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';

export default ({ id }: IdProps) => {
  return <Modal id={id}>HELLO</Modal>;
};
