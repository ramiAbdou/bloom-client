/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form';
import FormItem from '@components/Form/FormItem';
import { FormData } from '@constants';
import { CREATE_MEMBERSHIP } from '../SignupGQL';
import { useSignup } from '../SignupProvider';

const Title = () => (
  <h3 className="s-signup-title">{useSignup().form?.title}</h3>
);

const Description = () => (
  <p className="s-signup-desc"> {useSignup().form?.description}</p>
);

const SubmitButton = () => {
  const { setUserId } = useSignup();
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const data = Form.useStoreState((store) => store.submittableData);
  const submitForm = Form.useStoreState((store) => store.submitForm);
  const onClick = async () => setUserId((await submitForm(data)).user.id);

  return (
    <PrimaryButton
      className="s-signup-submit-btn"
      disabled={!isCompleted}
      title="Submit Application"
      onClick={onClick}
    />
  );
};

// -----------------------------------------------------------------------------

const Content = () => (
  <>
    {Form.useStoreState((store) => store.items)?.map((props) => (
      <FormItem key={props.title} {...props} />
    ))}
  </>
);

export default () => {
  const [createMembership] = useMutation(CREATE_MEMBERSHIP);
  const { communityId, form } = useSignup();
  if (!communityId || !form) return null;

  const submitForm = async (data: FormData) =>
    createMembership({ variables: { communityId, data } });

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
