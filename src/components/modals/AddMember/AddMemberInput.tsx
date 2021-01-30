import React from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import Row from '@containers/Row/Row';
import FormItem from '@organisms/Form/FormItem';
import { useStoreState } from '@store/Store';
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
        <FormShortText id={`${id}=FIRST_NAME`} placeholder="First Name" />
        <FormShortText id={`${id}=LAST_NAME`} placeholder="Last Name" />
        <FormShortText
          category="EMAIL"
          id={`${id}=EMAIL`}
          placeholder="Email"
        />

        {isOwner && !admin && (
          <FormItem
            plain
            id={`${id}=CHECKBOX`}
            options={['Make Admin']}
            required={false}
            type="MULTIPLE_SELECT"
          />
        )}
      </Row>
    </div>
  );
};

export default AddMemberInput;
