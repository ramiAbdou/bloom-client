/**
 * @fileoverview Component: SignupForm
 * @author Rami Abdou
 */

import React from 'react';

import { PrimaryButton } from '@components/Button';
import { FormProvider } from '@components/Form';
import { Item } from '@components/Form/Form.components';
import { useForm } from '@components/Form/Form.state';
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
  return (
    <PrimaryButton className="s-signup-submit-btn" title="Submit Application" />
  );
};

// -----------------------------------------------------------------------------

const FormContent = () => {
  const { items } = useForm();
  return (
    <>
      {items.map((props) => (
        <Item {...props} />
      ))}
    </>
  );
};

export default () => {
  const { form } = useSignup();
  if (!form) return null;

  return (
    <FormProvider initialItems={form.items}>
      <div className="s-signup">
        <Title />
        <Description />
        <FormContent />
        <SubmitButton />
      </div>
    </FormProvider>
  );
};
