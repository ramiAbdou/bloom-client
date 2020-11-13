/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { Redirect, useParams } from 'react-router-dom';

import { EncodedUrlNameParams } from '@constants';
import { useStoreState } from '@store/Store';

const EmailContainer = () => {
  // const email = Application.useStoreState((store) => store.email);
  return <p className="s-signup-confirmation-email">ra494@cornell.edu</p>;
};

const Content = () => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const autoAccept = useStoreState(({ community }) => community?.autoAccept);
  const name = useStoreState(({ community }) => community?.name);

  if (!name) return <Redirect to={`/${encodedUrlName}/apply`} />;
  if (!autoAccept)
    return (
      <>
        <p>
          Your application to <span>{name}</span> was received. When you are
          accepted into the community, we'll send you an email at:
        </p>

        <EmailContainer />
        <p>You may now close this page.</p>
      </>
    );

  return (
    <>
      <p>
        Congratulations, you've been accepted into the <span>{name}</span>
        community! We just sent a temporary login link to:
      </p>

      <EmailContainer />
      <p>You may now close this page.</p>
    </>
  );
};

export default () => (
  <div className="s-signup-confirmation-ctr">
    <motion.div
      animate={{ y: 0 }}
      className="s-signup-confirmation"
      initial={{ y: 50 }}
      transition={{ duration: 0.2 }}
    >
      <IoIosCheckmarkCircle />
      <Content />
    </motion.div>
  </div>
);
