import { gql } from '@apollo/client';

const MEMBER_ROLE_FRAGMENT = gql`
  fragment MemberRoleFragment on members {
    role
  }
`;

export default MEMBER_ROLE_FRAGMENT;
