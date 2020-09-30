/**
 * @fileoverview Component: SignupForm
 * @author Rami Abdou
 */

import React from 'react';
import shortid from 'shortid';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form';
import FormItem from '@components/Form/FormItem';
import { FormData } from '@constants';
import { createMembership } from '@scenes/Signup/Signup.gql';
import { useSignup } from '../../Signup.state';

const Title = () => (
  <h3 className="s-signup-title">{useSignup().form?.title}</h3>
);

const Description = () => (
  <p className="s-signup-desc"> {useSignup().form?.description}</p>
);

const SubmitButton = () => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const data = Form.useStoreState((store) => store.submittableData);
  const submitForm = Form.useStoreState((store) => store.submitForm);

  return (
    <PrimaryButton
      className="s-signup-submit-btn"
      disabled={!isCompleted}
      title="Submit Application"
      onClick={() => submitForm(data)}
    />
  );
};

// -----------------------------------------------------------------------------

const Content = () => (
  <>
    {Form.useStoreState((store) => store.items)?.map((props) => (
      <FormItem key={shortid()} {...props} />
    ))}
  </>
);

export default () => {
  const { communityId, form } = useSignup();
  if (!communityId || !form) return null;

  const submitForm = async (data: FormData) =>
    createMembership(communityId, data);

  return (
    <Form.Provider initialData={{ questions: form.questions, submitForm }}>
      <div className="s-signup">
        <Title />
        <Description />
        <Content />
        <SubmitButton />
      </div>
    </Form.Provider>
  );
};
