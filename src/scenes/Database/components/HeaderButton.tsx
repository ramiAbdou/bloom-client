/**
 * @fileoverview Scene: Header
 * @author Rami Abdou
 */

import React from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';

type HeaderButtonProps = { response: 'ACCEPTED' | 'REJECTED' };

export const AddMemberButton = () => <PrimaryButton title="Add Member" />;
