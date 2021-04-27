import React, { useEffect } from 'react';
import { IoCopy } from 'react-icons/io5';
import { toastQueueVar, useToast } from 'src/App.reactive';

import { DocumentNode, gql, useLazyQuery } from '@apollo/client';
import { useTableState } from '@components/organisms/Table/Table.state';
import { TableState } from '@components/organisms/Table/Table.types';
import { IMember } from '@util/constants.entities';
import DatabaseAction from './DatabaseAction';

interface GetMemberEmailsByCommunityIdArgs {
  idExp: Record<string, unknown>;
}

interface GetMemberEmailsByCommunityIdResult {
  members: IMember[];
}

const GET_MEMBER_EMAILS_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetMemberEmailsByCommunityId(
    $communityId: String!
    $idExp: String_comparison_exp!
    $roleExp: String_comparison_exp! = {}
    $searchString: String!
    $searchStringWord: String!
  ) {
    communityId @client @export(as: "communityId")
    databaseRoleExp @client @export(as: "roleExp")
    databaseSearchString @client @export(as: "searchString")
    databaseSearchStringWord @client @export(as: "searchStringWord")

    members(
      where: {
        _and: [
          { communityId: { _eq: $communityId } }
          { deletedAt: { _is_null: true } }
          { id: $idExp }
          { role: $roleExp }
          { status: { _eq: "Accepted" } }
          {
            _or: [
              { email: { _ilike: $searchStringWord } }
              { firstName: { _ilike: $searchString } }
              { lastName: { _ilike: $searchString } }
            ]
          }
        ]
      }
    ) {
      email
      id
    }
  }
`;

/**
 * Copies all of the selected members' emails to clipboard, in a
 * comma-separated list.
 */
const DatabaseCopyMemberEmailsButton: React.FC = () => {
  const [getMemberEmails, { data, loading }] = useLazyQuery<
    GetMemberEmailsByCommunityIdResult,
    GetMemberEmailsByCommunityIdArgs
  >(GET_MEMBER_EMAILS_BY_COMMUNITY_ID);

  const { isAllRowsSelected, selectedRowIds }: TableState = useTableState();
  const { showToast } = useToast(toastQueueVar);

  const members: IMember[] = data?.members;

  useEffect(() => {
    if (!members) return;

    // Converts the array of emails into a comma-separated string with all
    // the emails joined together.
    const joinedEmails: string = members
      .map((member: IMember) => member.email)
      .join(',');

    // Copy it to the clipboard.
    navigator.clipboard.writeText(joinedEmails);
    showToast({ message: 'Email(s) copied to clipboard.' });
  }, [members]);

  const onClick = (): void => {
    const idExp: Record<string, unknown> = isAllRowsSelected
      ? {}
      : { _in: selectedRowIds };

    getMemberEmails({ variables: { idExp } });
  };

  return (
    <DatabaseAction
      Icon={IoCopy}
      loading={loading}
      tooltip="Copy Email"
      onClick={onClick}
    />
  );
};

export default DatabaseCopyMemberEmailsButton;
