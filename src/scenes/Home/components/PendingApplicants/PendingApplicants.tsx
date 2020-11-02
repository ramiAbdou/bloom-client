/**
 * @fileoverview Scene: PendingApplications
 * @author Rami Abdou
 */

import './PendingApplicants.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import Spinner from '@components/Loader/Spinner';
import TableContent from '@components/Table/Table';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { Community, IApplicationQuestion } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PENDING_APPLICATIONS } from '../../Home.gql';
import TableActions from './TableActions';

const NoPendingApplicationsMessage = () => (
  <p>There are no pending applications. 👍</p>
);

const ApplicationTable = () => {
  const questions: IApplicationQuestion[] = useStoreState(
    ({ applicationQuestions, community }) =>
      community.applicationQuestions?.map(
        (questionId: string) => applicationQuestions.byId[questionId]
      )
  );

  const pendingApplicants = useStoreState((store) => store.pendingApplicants);

  const data = useMemo(
    () =>
      !pendingApplicants
        ? []
        : pendingApplicants.allIds.reduce((acc: Row[], applicantId: string) => {
            const { applicantData } = pendingApplicants.byId[applicantId];
            const result = { id: applicantId };
            applicantData.forEach(({ questionId, value }) => {
              result[questionId] = value;
            });

            return [...acc, result];
          }, []),
    [pendingApplicants.allIds?.length]
  );

  const columns = useMemo(
    () =>
      !questions
        ? []
        : questions.map(({ type, id, title }) => ({ id, title, type })),
    [questions?.length]
  );

  if (!pendingApplicants.allIds?.length)
    return <NoPendingApplicationsMessage />;
  return (
    <Table.Provider initialData={{ columns, data }}>
      <TableActions />
      <TableContent />
    </Table.Provider>
  );
};

export default () => {
  const updateEntities = useStoreActions((store) => store.updateEntities);
  const { data, loading } = useQuery(GET_PENDING_APPLICATIONS);

  useEffect(() => {
    if (!data) return;

    updateEntities({
      data: {
        applicationQuestions: data?.getApplicants.application.questions,
        pendingApplicants: data?.getApplicants.pendingApplicants
      },
      schema: Community
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
