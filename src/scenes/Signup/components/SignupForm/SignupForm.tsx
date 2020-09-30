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

const Title = () => (
  <h3 className="s-signup-title">{useSignup().form?.title}</h3>
);

const Description = () => <p>{useSignup().form?.description}</p>;

const SubmitButton = () => (
  <PrimaryButton
    className="s-signup-submit-btn"
    disabled={!Form.useStoreState((store) => store.isCompleted)}
    title="Submit Application"
  />
);

// -----------------------------------------------------------------------------

const Content = () => (
  <>
    {Form.useStoreState((store) => store.items)?.map((props) => (
      <FormItem key={shortid()} {...props} />
    ))}
  </>
);

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
