import React from 'react';

import MainContent from '@containers/Main/MainContent';
import LoadingStore from '@store/Loading.store';
import ApplicantsCardContainer from './ApplicantsCardContainer';
import ApplicantsHeader from './ApplicantsHeader';
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
  <LoadingStore.Provider>
    <ApplicantsContent />
  </LoadingStore.Provider>
);

export default Applicants;
