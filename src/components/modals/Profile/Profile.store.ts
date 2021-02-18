import { createContextStore } from 'easy-peasy';

interface ProfileModel {
  memberId: string;
  userId: string;
}

const ProfileStore = createContextStore<ProfileModel>(
  (runtimeModel) => runtimeModel,
  { disableImmer: true }
);

export default ProfileStore;
