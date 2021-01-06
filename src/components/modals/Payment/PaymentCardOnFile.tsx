import React from 'react';

import Label from '@organisms/Form/FormLabel';
import { useStoreState } from '@store/Store';

interface CardOnFileProps {
  isFree?: boolean;
}

/**
 * Includes short description of the current card on file (brand and last four
 * digits of the card). If the card isn't present, returns null.
 */
const CardOnFile = ({ isFree }: CardOnFileProps) => {
  const brand = useStoreState(({ db }) => db.member.paymentMethod?.brand);
  const last4 = useStoreState(({ db }) => db.member.paymentMethod?.last4);

  // Return null if the membership is free, if the user is updating their
  // card on file, or there's not a card stored in the first place.
  if (isFree || !last4) return null;

  const cardString = `${brand} ending in ${last4}`;

  return (
    <div className="c-form-item">
      <Label>Credit or Debit Card</Label>
      <p>{cardString}</p>
    </div>
  );
};

export default CardOnFile;
