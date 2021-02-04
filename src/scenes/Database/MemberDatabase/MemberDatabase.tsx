import deepequal from 'fast-deep-equal';
import React from 'react';

import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import Table from '@organisms/Table/Table';
import {
  OnRenameColumn,
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IIntegrations, IQuestion } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { RENAME_QUESTION, RenameQuestionArgs } from '../Database.gql';
import getMemberTableRow from './getMemberTableRow';
import ActionRow from './MemberDatabaseActions';
import MemberDatabaseDeleteModal from './MemberDatabaseDeleteModal';
import MemberDatabasePromoteModal from './MemberDatabasePromoteModal';

const MemberDatabaseModals: React.FC = () => (
  <>
    <MemberDatabaseDeleteModal />
    <MemberDatabasePromoteModal />
  </>
);

const MemberDatabase: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useStoreState(
    ({ db }) => getMemberTableRow({ db }),
    deepequal
  );

  const columns: TableColumn[] = useStoreState(({ db }) => {
    const { byId: byIntegrationsId } = db.entities.integrations;
    const { byId: byQuestionId } = db.entities.questions;

    const integrations: IIntegrations =
      byIntegrationsId[db.community?.integrations];

    return db.community.questions
      ?.map((id: string) => byQuestionId[id])
      ?.filter(({ category }: IQuestion) => {
        if (category === 'DUES_STATUS' && !integrations.stripeAccountId) {
          return false;
        }

        return true;
      });
  });

  const [renameQuestion] = useMutation<IQuestion, RenameQuestionArgs>({
    name: 'renameQuestion',
    query: RENAME_QUESTION
  });

  const onRenameColumn: OnRenameColumn = async ({ column, updateColumn }) => {
    const { title, id } = column;
    const { error } = await renameQuestion({ id, title });
    if (!error) updateColumn({ id, title });
  };

  const options: TableOptions = {
    hasCheckbox: true,
    isClickable: true,
    onRenameColumn,
    onRowClick: ({ id: memberId }: TableRow) => {
      showModal(`${ModalType.MEMBER_PROFILE}-${memberId}`);
    }
  };

  return (
    <Table
      columns={columns}
      options={options}
      rows={rows}
      show={!!columns?.length}
    >
      <ActionRow />
      <TableContent />
      <MemberDatabaseModals />

      {rows.map((row: TableRow) => {
        return <MemberProfileModal memberId={row?.id} />;
      })}
    </Table>
  );
};

export default MemberDatabase;
