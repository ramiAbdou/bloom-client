import React from 'react';

import { IdProps } from '@constants';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import { IMemberType, IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
// import FormContinueButton from '../../components/organisms/Form/FormContinueButton';
import { RadioOptionProps } from '../../components/molecules/Radio/Radio.types';

const ApplicationSelectTypeCardContent: React.FC<IdProps> = ({ id }) => {
  const type: IMemberType = useStoreState(({ db }) => {
    return db.entities.types.byId[id];
  });

  console.log(id, type);

  if (!type) return null;

  console.log('YERRR');

  const { amount, recurrence } = type;

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount / 100}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'Per Year'],
    [recurrence === 'MONTHLY', 'Per Month'],
    [recurrence === 'LIFETIME', 'Lifetime']
  ]);

  return (
    <p className="s-application-type-string">
      <span>{amountString}</span>
      <span>{recurrenceString}</span>
    </p>
  );
};

const ApplicationSelectTypePage: React.FC = () => {
  const cardOptions: RadioOptionProps[] = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    return db.community?.types?.map((typeId: string) => {
      const type: IMemberType = byTypeId[typeId];

      return {
        children: <ApplicationSelectTypeCardContent id={typeId} />,
        label: type.name
      };
    });
  });

  return (
    <FormPage id="SELECT_TYPE">
      <FormItem
        card
        cardOptions={cardOptions}
        id="selectType"
        type="MULTIPLE_CHOICE"
      />
      {/* {questions?.map((props) => (
        <FormItem key={props.id} {...props} />
      ))}

      <FormErrorMessage marginBottom={-24} />
      <FormContinueButton>Next: Choose Membership</FormContinueButton> */}
    </FormPage>
  );
};

export default ApplicationSelectTypePage;
