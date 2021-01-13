import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import Row from '@containers/Row/Row';

interface ProfileCardHeaderProps {
  canEdit?: boolean;
  h2?: boolean;
  onEditClick?: VoidFunction;
  title: string;
}

const ProfileEditButton: React.FC<
  Pick<ProfileCardHeaderProps, 'canEdit' | 'onEditClick'>
> = ({ canEdit, onEditClick }) => {
  if (!canEdit) return null;

  return (
    <Button tertiary className="s-profile-edit" onClick={onEditClick}>
      Edit
      <IoCreateOutline />
    </Button>
  );
};

const ProfileCardHeader: React.FC<ProfileCardHeaderProps> = ({
  h2,
  title,
  ...editProps
}) => {
  return (
    <Row spaceBetween>
      {h2 && <h2>{title}</h2>}
      {!h2 && <h3>{title}</h3>}
      <ProfileEditButton {...editProps} />
    </Row>
  );
};

export default ProfileCardHeader;
