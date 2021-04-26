import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import { IMember } from '@util/constants.entities';
import ApplicantsCard from './ApplicantsCard';
import ApplicantsCardList from './ApplicantsCardList';
import ApplicantsHeader from './ApplicantsHeader';

interface GetApplicantsByCommunityIdResult {
  members: IMember[];
}

const GET_APPLICANTS_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetApplicantsByCommunityId($communityId: String!) {
    communityId @client @export(as: "communityId")

    members(
      where: { communityId: { _eq: $communityId }, status: { _eq: "Pending" } }
      order_by: { createdAt: desc }
    ) {
      id
      ...ApplicantsCardFragment
    }
  }
  ${ApplicantsCard.fragment}
`;

const Applicants: React.FC = () => {
  const { data, loading } = useQuery<GetApplicantsByCommunityIdResult>(
    GET_APPLICANTS_BY_COMMUNITY_ID
  );

  if (loading) return null;

  const applicants: IMember[] = data?.members;

  return (
    <Scene>
      <MainContent>
        <ApplicantsHeader applicants={applicants} loading={loading} />
        {applicants && <ApplicantsCardList applicants={applicants} />}
      </MainContent>
    </Scene>
  );
};

export default Applicants;
