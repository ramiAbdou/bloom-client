/**
 * @fileoverview Component: SignupForm
 * @author Rami Abdou
 */

import React from 'react';

import { PrimaryButton } from '@components/Button';
import { FormProvider, useForm } from '@components/Form';
import { useSignup } from '../../Signup.state';
import SignupFormItem from './SignupFormItem';

const Title = () => {
  const { form } = useSignup();
  return form ? <h3 className="s-signup-title">{form.title}</h3> : null;
};

const Description = () => {
  const { form } = useSignup();
  return form && form.description ? <p>{form.description}</p> : null;
};

const SubmitButton = () => {
  const { canSubmit } = useForm();

  return (
    <PrimaryButton
      className="s-signup-submit-btn"
      disabled={!canSubmit}
      title="Submit Application"
    />
  );
};

// -----------------------------------------------------------------------------

export default () => {
  const { form } = useSignup();
  if (!form) return null;

  return (
    <FormProvider>
      <div className="s-signup">
        <Title />
        <Description />
        {form.items.map((item) => (
          <SignupFormItem {...item} />
        ))}
        <SubmitButton />
      </div>
    </FormProvider>
  );
};
