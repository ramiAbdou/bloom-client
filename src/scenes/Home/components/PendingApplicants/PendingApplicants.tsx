/**
 * @fileoverview Scene: PendingApplications
 * @author Rami Abdou
 */

import './PendingApplicants.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import Table from '@components/ArchivedTable/Table';
import Spinner from '@components/Loader/Spinner';
import { PendingApplication } from '@store/Membership.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PENDING_APPLICATIONS } from '../../Home.gql';

const NoPendingApplicationsMessage = () => (
  <p>There are no pending applications. 👍</p>
);

const ApplicationTable = () => {
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
    [pendingApplications?.length]
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
    [applicationQuestions?.length]
  );

  if (!pendingApplications?.length) return <NoPendingApplicationsMessage />;
  return <Table columns={columns} data={data} />;
};

export default () => {
  const setPendingApplications = useStoreActions(
    ({ membership }) => membership.setPendingApplications
  );
  const { data, loading } = useQuery(GET_PENDING_APPLICATIONS);

  useEffect(() => {
    if (data)
      setPendingApplications({
        applications: data?.getCommunity?.pendingMemberships.map(
          ({ applicationData }) => applicationData
        ),
        questions: data?.getCommunity?.application?.questions
      });
  }, [data]);

  return (
    <div className="s-home-applicants">
      <div className="s-home-header">
        <h3>Pending Applications</h3>
        {loading && <Spinner dark />}
      </div>

      {!loading && data && <ApplicationTable />}
    </div>
  );
};
