import { createContextStore } from 'easy-peasy';

import { QuestionType } from '@constants';
import { IMember, IUser } from '@store/entities';

export interface MemberCardModel extends Pick<IMember, 'role' | 'type'>, IUser {
  bio: string;
  expandedCardData: { title: string; type: QuestionType; value: string }[];
  highlightedValue: string;
}

export const memberCardModel: MemberCardModel = null;

export default createContextStore<MemberCardModel>((model) => model, {
  disableImmer: true
});
