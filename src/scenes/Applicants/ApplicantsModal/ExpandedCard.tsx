import React from 'react';

import QuestionValueList, {
  QuestionValueItemProps
} from '@components/Elements/QuestionValueList';
import { AcceptButton, IgnoreButton } from '../ApplicantsCard/ActionButton';
import Applicant from '../ApplicantsCard/ApplicantsCard.store';

const Header = () => {
  const fullName = Applicant.useStoreState((store) => store.fullName);

  return (
    <div className="s-applicants-card-header s-applicants-expanded-header">
      <h1>{fullName}</h1>

      <div>
        <AcceptButton />
        <IgnoreButton />
      </div>
    </div>
  );
};

const ExpandedCard: React.FC = () => {
  const items: QuestionValueItemProps[] = Applicant.useStoreState((store) => {
    return store.data.map(({ question, value }) => {
      return { title: question.title, type: question.type, value };
    });
  });

  return (
    <div className="s-applicants-expanded">
      <Header />
      <QuestionValueList items={items} />
    </div>
  );
};

export default ExpandedCard;
