import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import Row from '@containers/Row/Row';
import FormItem from '@organisms/Form/FormItem';
import { useStoreState } from '@store/Store';
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
  const isOwner = useStoreState(({ db }) => db.isOwner);
  const admin = AddMemberStore.useStoreState((store) => store.admin);

  return (
    <div className="mo-add-member-input-ctr">
      <Row align="baseline" className="mo-add-member-input">
        <AddMemberInputTrashButton id={id} />

        <FormItem
          required
          id={`${id}=FIRST_NAME`}
          placeholder="First Name"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          id={`${id}=LAST_NAME`}
          placeholder="Last Name"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          id={`${id}=EMAIL`}
          placeholder="Email"
          type="SHORT_TEXT"
          validate="IS_EMAIL"
        />

        {isOwner && !admin && (
          <FormItem
            plain
            id={`${id}=CHECKBOX`}
            options={['Make Admin']}
            type="MULTIPLE_SELECT"
          />
        )}
      </Row>
    </div>
  );
};

export default AddMemberInput;
