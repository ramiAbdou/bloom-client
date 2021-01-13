import React from 'react';
import { IoMail } from 'react-icons/io5';

interface MailToProps {
  email: string;
}

const MailTo: React.FC<MailToProps> = ({ email }) => {
  return (
    <a className="m-misc-mail-to" href={`mailto:${email}`}>
      <IoMail />
      <p>{email}</p>
    </a>
  );
};

export default MailTo;
