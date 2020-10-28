/**
 * @fileoverview Scene: PendingApplications
 * @author Rami Abdou
 */

import './PendingApplications.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import Table from '@components/Table/Table';
import { PendingApplication } from '@store/Membership.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PENDING_APPLICATIONS } from '../../Home.gql';

const Questions = () => {
  const applicationQuestions = useStoreState(
    ({ membership }) =>
      membership.activeMembership?.community?.applicationQuestions
  );

  const pendingApplications = useStoreState(
    ({ membership }) =>
      membership.activeMembership?.community?.pendingApplications
  );

  const data = useMemo(
    () =>
      !pendingApplications
        ? []
        : pendingApplications.reduce(
            (acc: Record<string, any>[], application: PendingApplication) => {
              const result = {};
              application.forEach(({ questionId, value }) => {
                result[questionId] = value;
              });
              return [...acc, result];
            },
            []
          ),
    []
  );

  const columns = useMemo(
    () =>
      !applicationQuestions
        ? []
        : applicationQuestions.map(({ type, id, title }) => ({
            Header: title,
            accessor: id,
            type
          })),
    []
  );

  return <Table className="" columns={columns} data={data} />;
};

export default () => {
  const setPendingApplications = useStoreActions(
    ({ membership }) => membership.setPendingApplications
  );
  const { data } = useQuery(GET_PENDING_APPLICATIONS);

  useEffect(() => {
    if (data)
      setPendingApplications({
        applications: data?.getCommunity?.pendingMemberships.map(
          ({ applicationData }) => applicationData
        ),
        questions: data?.getCommunity?.application?.questions
      });
  }, [data?.getCommunity?.application?.questions.length]);

  return (
    <div className="s-home-applications">
      <h3>Pending Applications</h3>
      <Questions />
    </div>
  );
};
