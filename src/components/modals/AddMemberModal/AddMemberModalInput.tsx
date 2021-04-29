import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import FormMultipleSelect from '@components/organisms/Form/FormMultipleSelect';
import FormShortText from '@components/organisms/Form/FormShortText';
import useMemberRole from '@core/hooks/useMemberRole';
import { useId } from '@core/state/Id.state';
import { QuestionCategory } from '@util/constants';
import { MemberRole } from '@util/constants.entities';
import { useAddMember, useAddMemberSelector } from './AddMemberModal.state';

const AddMemberInputTrashButton: React.FC = () => {
  const [, addMemberDispatch] = useAddMember();
  const rowId: string = useId();

  const show: boolean = useAddMemberSelector((state) => state.rows.length >= 2);

  const onClick = (): void => {
    addMemberDispatch({ rowId, type: 'DELETE_ROW' });
  };

  return (
    <Button className="mr-sm--nlc misc-trash" show={show} onClick={onClick}>
      <IoTrash />
    </Button>
  );
};

const AddMemberInput: React.FC = () => {
  const id: string = useId();
  const isOwner: boolean = useMemberRole() === MemberRole.OWNER;

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
        show={!!isOwner}
      />
    </Row>
  );
};

export default AddMemberInput;
