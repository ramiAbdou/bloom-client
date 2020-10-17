/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form';
import FormItem from '@components/Form/FormItem';
import { FormData } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { CREATE_MEMBERSHIP } from '../SignupGQL';

const Title = () => {
  const application = useStoreState(({ community }) => community.application);
  return <h3 className="s-signup-title"> {application?.title}</h3>;
};

const Description = () => {
  const application = useStoreState(({ community }) => community.application);
  return <p className="s-signup-desc"> {application?.description}</p>;
};

const SubmitButton = () => {
  const { location, push } = useHistory();
  const initUser = useStoreActions(({ user }) => user.init);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const data = Form.useStoreState((store) => store.submittableData);
  const email = Form.useStoreState(
    (store) =>
      store.items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );
  const submitForm = Form.useStoreState((store) => store.submitForm);
  const onClick = async () => {
    const result = await submitForm(data, email);
    if (!result?.user) return;
    initUser(result.user);
    push(`${location.pathname}/confirmation`);
  };

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
  const application = useStoreState(({ community }) => community.application);
  const communityId = useStoreState(({ community }) => community.id);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  if (!communityId || !application) return null;

  const submitForm = async (data: FormData, email: string) => {
    const { data: result, error } = await createMembership({
      variables: { data, email }
    });

    const errorMessage = getGraphQLError(error);
    console.log(errorMessage);
    if (errorMessage) showToast({ isError: true, message: errorMessage });
    return !errorMessage && result.applyForMembership;
  };

  return (
    <Form.Provider
      initialData={{ questions: application.questions, submitForm }}
    >
      <div className="s-signup">
        <Title />
        <Description />
        <Content />
        <SubmitButton />
      </div>
    </Form.Provider>
  );
};
