import React from 'react';

import Loading from '@store/Loading.store';
import MainContent from '@templates/Main/Content';
import ApplicantsCardContainer from './ApplicantsCardContainer';
import ApplicantsHeader from './ApplicantsHeader/ApplicantsHeader';
import useFetchApplicants from './useFetchApplicants';

const ApplicantsContent: React.FC = () => {
  useFetchApplicants();

  return (
    <>
      <ApplicantsHeader />

      <MainContent>
        <ApplicantsCardContainer />
      </MainContent>
    </>
  );
};

const Applicants: React.FC = () => (
  <Loading.Provider>
    <ApplicantsContent />
  </Loading.Provider>
);

export default Applicants;
