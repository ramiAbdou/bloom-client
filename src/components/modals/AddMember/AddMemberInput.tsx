import React from 'react';
import { IoTrash } from 'react-icons/io5';
import validator from 'validator';

import Button from '@atoms/Button';
import { IdProps } from '@constants';
import Row from '@containers/Row';
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
      <Row className="mo-add-member-input">
        <AddMemberInputTrashButton id={id} />

        <FormItem
          required
          category="FIRST_NAME"
          id={`${id}=FIRST_NAME`}
          placeholder="First Name"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          category="LAST_NAME"
          id={`${id}=LAST_NAME`}
          placeholder="Last Name"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          category="EMAIL"
          id={`${id}=EMAIL`}
          placeholder="Email"
          type="SHORT_TEXT"
          validate={(value: string) => validator.isEmail(value)}
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
