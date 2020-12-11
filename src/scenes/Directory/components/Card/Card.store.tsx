import { createContextStore } from 'easy-peasy';

import { QuestionType } from '@constants';
import { IUser } from '@store/entities';

export interface MemberCardData extends IUser {
  bio: string;
  expandedCardData: { title: string; type: QuestionType; value: string }[];
  highlightedValue: string;
}

type MemberCardModel = { member: MemberCardData };

export const memberCardModel: MemberCardModel = { member: null };

export default createContextStore<MemberCardModel>((model) => model, {
  disableImmer: true
});
