import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import FormMultipleSelect from '@organisms/Form/FormMultipleSelect';
import FormShortText from '@organisms/Form/FormShortText';
import { MemberRole } from '@store/db/Db.entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
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
  const id: string = IdStore.useStoreState((state) => state.id);

  const isOwner = useStoreState(
    ({ db }) => db.member?.role === MemberRole.OWNER
  );

  const admin = AddMemberStore.useStoreState((state) => state.admin);

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
