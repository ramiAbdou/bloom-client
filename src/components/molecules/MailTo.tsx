import React from 'react';
import { IoMail } from 'react-icons/io5';

import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

interface MailToProps extends BaseProps {
  email: string;
}

const MailTo: React.FC<MailToProps> = ({ className, email }) => {
  const css = cx('m-misc-mail-to', {}, className);

  return (
    <a className={css} href={`mailto:${email}`}>
      <IoMail />
      <p>{email}</p>
    </a>
  );
};

export default MailTo;
