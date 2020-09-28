/**
 * @fileoverview Component: SignupForm
 * @author Rami Abdou
 */

import React from 'react';
import shortid from 'shortid';

import { PrimaryButton } from '@components/Button';
import { FormProvider } from '@components/Form';
import { useForm } from '@components/Form/Form.state';
import FormItem from '@components/Form/FormItem';
import { useSignup } from '../../Signup.state';

const Title = () => {
  const { form } = useSignup();
  return form ? <h3 className="s-signup-title">{form.title}</h3> : null;
};

const Description = () => {
  const { form } = useSignup();
  return form && form.description ? <p>{form.description}</p> : null;
};

const SubmitButton = () => {
  const { isCompleted } = useForm();

  return (
    <PrimaryButton
      className="s-signup-submit-btn"
      disabled={!isCompleted}
      title="Submit Application"
    />
  );
};

// -----------------------------------------------------------------------------

const FormContent = () => {
  const { items } = useForm();

  return (
    <>
      {items.map((props) => (
        <FormItem key={shortid()} {...props} />
      ))}
    </>
  );
};

export default () => {
  const { form } = useSignup();
  if (!form) return null;

  return (
    <FormProvider initialItems={form.questions}>
      <div className="s-signup">
        <Title />
        <Description />
        <FormContent />
        <SubmitButton />
      </div>
    </FormProvider>
  );
};
