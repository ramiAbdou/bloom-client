/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */
import { Form } from '@constants';
import GraphQL from '@util/GraphQL';

class SignupGQL extends GraphQL {
  getMembershipForm = async (community: string): Promise<Form> => {
    const result = await this.query(`
      getCommunity (encodedURLName: "${community}") {
        membershipForm {
          title
          description
          items {
            category
            description
            required
            options
            title
            type
          }
        }
      }
    `);

    return result.membershipForm;
  };
}

export default new SignupGQL();
