/**
 * @fileoverview Component: SignupForm
 * @author Rami Abdou
 */

import React from 'react';
import shortid from 'shortid';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form';
import FormItem from '@components/Form/FormItem';
import { useSignup } from '../../Signup.state';

const Title = () => {
  const { form } = useSignup();
  return <h3 className="s-signup-title">{form?.title}</h3>;
};

const Description = () => {
  const { form } = useSignup();
  return <p>{form?.description}</p>;
};

const SubmitButton = () => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);

  return (
    <PrimaryButton
      className="s-signup-submit-btn"
      disabled={!isCompleted}
      title="Submit Application"
    />
  );
};

// -----------------------------------------------------------------------------

const Content = () => {
  const items = Form.useStoreState((store) => store.items);

  return (
    <>
      {items?.map((props) => (
        <FormItem key={shortid()} {...props} />
      ))}
    </>
  );
};

export default () => {
  const { form } = useSignup();
  if (!form) return null;

  return (
    <Form.Provider initialData={form.questions}>
      <div className="s-signup">
        <Title />
        <Description />
        <Content />
        <SubmitButton />
      </div>
    </Form.Provider>
  );
};
