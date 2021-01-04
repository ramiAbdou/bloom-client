import React from 'react';

import QuestionValue from '@components/Elements/QuestionValue';
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

export default () => {
  const data = Applicant.useStoreState((store) => store.expandedData);

  return (
    <div className="s-applicants-expanded">
      <Header />
      <div>
        {data.map(({ question: { title, type }, value }) => (
          <QuestionValue key={title} title={title} type={type} value={value} />
        ))}
      </div>
    </div>
  );
};
