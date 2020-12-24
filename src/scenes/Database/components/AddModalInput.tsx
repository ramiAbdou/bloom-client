import React, { memo } from 'react';
import { IoTrash } from 'react-icons/io5';

import Button from '@components/Button/Button';
import Checkbox from '@components/Elements/Checkbox';
import Input from '@components/Elements/Input';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { Function, IdProps } from '@constants';
import { makeClass, takeFirst } from '@util/util';
import { AddMemberData } from '../../Actions/AddMember/AddMember.store';

interface AddModalInputProps extends IdProps {
  isShowingErrors: boolean;

  // We don't include AddAdminData b/c it has everything except the boolean
  // admin field.
  member: AddMemberData;

  onDelete: Function;
  showAdminCheckbox?: boolean;
  toggleAdmin?: any;
  updateMember?: any;
}

export default memo(
  ({
    onDelete,
    id,
    isShowingErrors,
    member,
    showAdminCheckbox,
    toggleAdmin,
    updateMember
  }: AddModalInputProps) => {
    const {
      admin,
      email,
      emailError,
      firstName,
      firstNameError,
      lastName,
      lastNameError
    } = member;

    const css = makeClass([
      's-database-add-modal-input',
      [emailError, 's-database-add-modal-input--error']
    ]);

    const message: string = takeFirst([
      [
        (firstNameError && lastNameError) ||
          (firstNameError && emailError) ||
          (lastNameError && emailError),
        'Please fix the errors with the fields above.'
      ],
      firstNameError,
      lastNameError,
      emailError
    ]);

    return (
      <div className={css}>
        <div>
          <Button onClick={onDelete}>
            <IoTrash />
          </Button>

          <Input
            dark
            error={isShowingErrors && !!firstNameError}
            placeholder="First Name"
            value={firstName}
            onChange={(value) =>
              updateMember({ field: 'FIRST_NAME', id, value })
            }
          />

          <Input
            dark
            error={isShowingErrors && !!lastNameError}
            placeholder="Last Name"
            value={lastName}
            onChange={(value) =>
              updateMember({ field: 'LAST_NAME', id, value })
            }
          />

          <Input
            dark
            error={isShowingErrors && !!emailError}
            placeholder="Email"
            value={email}
            onChange={(value) => updateMember({ field: 'EMAIL', id, value })}
          />

          {showAdminCheckbox && (
            <div>
              <Checkbox selected={admin} onClick={() => toggleAdmin(id)} />
              <p>Make Admin</p>
            </div>
          )}
        </div>

        {isShowingErrors && (
          <ErrorMessage marginBottom={16} message={message} />
        )}
      </div>
    );
  }
);
