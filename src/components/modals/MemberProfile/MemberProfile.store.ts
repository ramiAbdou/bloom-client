import { createContextStore } from 'easy-peasy';

export interface MemberProfileModel {
  memberId: string;
  userId: string;
}

const MemberProfileStore = createContextStore<MemberProfileModel>(
  (runtimeModel) => runtimeModel,
  { disableImmer: true }
);

export default MemberProfileStore;
