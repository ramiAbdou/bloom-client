import { createContextStore } from 'easy-peasy';

import { IMember, IMemberData, IUser } from '@store/Db/entities';

export interface MemberCardModel
  extends Pick<IMember, 'bio' | 'role' | 'type'>,
    IUser {
  data: IMemberData[];
  memberId?: string;
  userId?: string;
}

export const memberCardModel: MemberCardModel = null;

export default createContextStore<MemberCardModel>((model) => model, {
  disableImmer: true
});
