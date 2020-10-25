/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form/Form.store';
import FormItem from '@components/Form/FormItem';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { CREATE_MEMBERSHIP } from '../Application.gql';
import { useApplication } from '../Application.state';

const Title = () => {
  const { application } = useApplication();
  return <h3 className="s-signup-title"> {application?.title}</h3>;
};

const Description = () => {
  const { application } = useApplication();
  return <p className="s-signup-desc"> {application?.description}</p>;
};

const SubmitButton = () => {
  const { location, push } = useHistory();
  const initUser = useStoreActions(({ user }) => user.init);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const submittableData = Form.useStoreState((store) => store.submittableData);
  const email = Form.useStoreState(
    ({ items }) =>
      items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );

  const [createMembership, { error, loading }] = useMutation(
    CREATE_MEMBERSHIP,
    {
      variables: { data: submittableData, email }
    }
  );

  const onClick = async () => {
    const { data } = await createMembership();
    if (!data?.user) return;
    initUser(data.user);
    push(`${location.pathname}/confirmation`);
  };

  const message = getGraphQLError(error);

  return (
    <>
      {!!message && <ErrorMessage marginBottom={-24} message={message} />}

      <PrimaryButton
        className="s-signup-submit-btn"
        disabled={!isCompleted}
        isLoading={loading}
        title="Submit Application"
        onClick={onClick}
      />
    </>
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
  const { application } = useApplication();
  if (!application) return null;

  return (
    <Form.Provider initialData={{ questions: application.questions }}>
      <div className="s-signup">
        <Title />
        <Description />
        <Content />
        <SubmitButton />
      </div>
    </Form.Provider>
  );
};
