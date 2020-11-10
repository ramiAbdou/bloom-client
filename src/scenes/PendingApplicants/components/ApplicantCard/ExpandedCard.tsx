/**
 * @fileoverview Scene: ExpandedCard
 * @author Rami Abdou
 */

import React from 'react';

import { AcceptButton, BackButton, IgnoreButton } from './ActionButton';
import Applicant from './Applicant.store';
import CardQuestion from './CardQuestion';

const Header = () => {
  const fullName = Applicant.useStoreState((store) => store.fullName);

  return (
    <div className="s-applicants-expanded-header">
      <BackButton />
      <h1>{fullName}</h1>

      <div>
        <AcceptButton />
        <IgnoreButton />
      </div>
    </div>
  );
};

export default () => {
  const data = Applicant.useStoreState((store) => store.data);

  return (
    <div className="s-applicants-expanded">
      <Header />
      <div>
        {data.map(({ question, value }) => (
          <CardQuestion
            key={question.title}
            question={question.title}
            type={question.type}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};
