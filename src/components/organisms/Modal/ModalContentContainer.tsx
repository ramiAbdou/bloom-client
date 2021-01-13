import React from 'react';

import { ChildrenProps } from '@constants';

const ModalContentContainer: React.FC<ChildrenProps> = ({ children }) => {
  return <section className="c-modal-content-ctr">{children}</section>;
};

export default ModalContentContainer;
