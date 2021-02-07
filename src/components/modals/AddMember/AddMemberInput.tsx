import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import Row from '@containers/Row/Row';
import { useStoreState } from '@store/Store';
import FormMultipleSelect from '../../organisms/Form/FormMultipleSelect';
import FormShortText from '../../organisms/Form/FormShortText';
import AddMemberStore from './AddMember.store';

const AddMemberInputTrashButton: React.FC<IdProps> = ({ id }) => {
  const deleteRow = AddMemberStore.useStoreActions((store) => store.deleteRow);
  const onClick = () => deleteRow(id);

  return (
    <Button onClick={onClick}>
      <IoTrash />
    </Button>
  );
};

const AddMemberInput: React.FC<IdProps> = ({ id }) => {
  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');
  const admin = AddMemberStore.useStoreState((store) => store.admin);

  return (
    <div className="mo-add-member-input-ctr">
      <Row align="baseline" className="mo-add-member-input">
        <AddMemberInputTrashButton id={id} />

        <FormShortText
          category="FIRST_NAME"
          metadata={id}
          placeholder="First Name"
        />

        <FormShortText
          category="LAST_NAME"
          metadata={id}
          placeholder="Last Name"
        />

        <FormShortText category="EMAIL" metadata={id} placeholder="Email" />

        <FormMultipleSelect
          plain
          metadata={id}
          options={['Make Admin']}
          required={false}
          show={!!isOwner && !admin}
        />
      </Row>
    </div>
  );
};

export default AddMemberInput;
