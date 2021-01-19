import { createContextStore } from 'easy-peasy';

import { IMember, IMemberData, IUser } from '@store/entities';

export interface MemberCardModel
  extends Pick<IMember, 'bio' | 'role' | 'type'>,
    IUser {
  data: IMemberData[];
}

export const memberCardModel: MemberCardModel = null;

export default createContextStore<MemberCardModel>((model) => model, {
  disableImmer: true
});
