import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import FormMultipleSelect from '@components/organisms/Form/FormMultipleSelect';
import FormShortText from '@components/organisms/Form/FormShortText';
import { IMember, MemberRole } from '@core/db/db.entities';
import IdStore from '@core/store/Id.store';
import useFindOne from '@gql/hooks/useFindOne';
import { QuestionCategory } from '@util/constants';
import AddMemberStore from './AddMember.store';

const AddMemberInputTrashButton: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => state.id);

  const show: boolean = AddMemberStore.useStoreState(
    (state) => state.rows.length >= 2
  );

  const deleteRow = AddMemberStore.useStoreActions((state) => state.deleteRow);
  const onClick = () => deleteRow(id);

  return (
    <Button className="mr-sm--nlc misc-trash" show={show} onClick={onClick}>
      <IoTrash />
    </Button>
  );
};

const AddMemberInput: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const id: string = IdStore.useStoreState((state) => state.id);
  const admin = AddMemberStore.useStoreState((state) => state.admin);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading) return null;

  const isOwner: boolean = member.role === MemberRole.OWNER;

  return (
    <Row align="baseline" className="mo-add-member-input" spacing="xs">
      <AddMemberInputTrashButton />

      <FormShortText
        category={QuestionCategory.FIRST_NAME}
        metadata={id}
        placeholder="First Name"
      />

      <FormShortText
        category={QuestionCategory.LAST_NAME}
        metadata={id}
        placeholder="Last Name"
      />

      <FormShortText
        category={QuestionCategory.EMAIL}
        className="mr-sm--nlc"
        metadata={id}
        placeholder="Email"
      />

      <FormMultipleSelect
        plain
        metadata={id}
        options={['Make Admin']}
        required={false}
        show={!!isOwner && !admin}
      />
    </Row>
  );
};

export default AddMemberInput;
