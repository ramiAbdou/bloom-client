import React, { memo } from 'react';

import Checkbox from '@components/Misc/Checkbox';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Input from '@components/Misc/Input';
import { IdProps } from '@constants';
import { makeClass, takeFirst } from '@util/util';
import { AddMemberData } from './AddMember/AddMember.store';

interface AddModalInputProps extends IdProps {
  isShowingErrors: boolean;

  // We don't include AddAdminData b/c it has everything except the boolean
  // admin field.
  member: AddMemberData;

  showAdminCheckbox?: boolean;

  toggleAdmin?: any;

  updateMember?: any;
}

export default memo(
  ({
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
      's-database-header-add-modal-email',
      [emailError, 's-database-header-add-modal-email--error']
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
          <Input
            dark
            error={isShowingErrors && !!firstNameError}
            value={firstName || 'First Name'}
            onChange={({ target }) =>
              updateMember({ field: 'FIRST_NAME', id, value: target.value })
            }
          />

          <Input
            dark
            error={isShowingErrors && !!lastNameError}
            value={lastName || 'Last Name'}
            onChange={({ target }) =>
              updateMember({ field: 'LAST_NAME', id, value: target.value })
            }
          />

          <Input
            dark
            error={isShowingErrors && !!emailError}
            value={email || 'Email'}
            onChange={({ target }) =>
              updateMember({ field: 'EMAIL', id, value: target.value })
            }
          />

          {showAdminCheckbox && (
            <div>
              <Checkbox selected={admin} onClick={() => toggleAdmin(id)} />
              <p>Make Admin</p>
            </div>
          )}
        </div>

        {isShowingErrors && !!message && (
          <ErrorMessage marginBottom={16} message={message} />
        )}
      </div>
    );
  }
);
