import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType, PopulateArgs } from '@constants';
import Card from '@containers/Card/Card';
import useQuery from '@hooks/useQuery';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { IMember, IMemberData, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_MEMBER_DATA, GET_MEMBER_DATA_QUESTIONS } from './Profile.gql';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileMembershipHeader: React.FC = () => {
  const title = useStoreState(({ db }) => {
    return `${db.community.name} Membership Information`;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.EDIT_MEMBERSHIP_INFORMATION);

  return <ProfileCardHeader canEdit title={title} onEditClick={onClick} />;
};

const ProfileMembershipContent: React.FC = () => {
  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      .filter((question: IQuestion) => !question.onlyInApplication)
      .filter((question: IQuestion) => !question.category);

    return questions?.map(({ id, title, type }: IQuestion) => {
      const data: IMemberData = db.member.data
        ?.map((dataId: string) => db.byDataId[dataId])
        ?.find((entity: IMemberData) => entity?.question === id);

      return { title, type, value: data?.value };
    });
  });

  return <QuestionValueList handleNull="HIDE_VALUE" items={items} />;
};

const ProfileMembershipOnboardingContainer: React.FC = () => {
  const hasData: boolean = useStoreState(({ db }) => {
    return db.member.data !== undefined;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.EDIT_MEMBERSHIP_INFORMATION);

  return (
    <Button fill primary show={!hasData} onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

const ProfileMembershipCard: React.FC = () => {
  const { loading: loading1 } = useQuery<IMember, PopulateArgs>({
    name: 'getMember',
    query: GET_MEMBER_DATA,
    schema: Schema.MEMBER,
    variables: { populate: ['community.questions', 'data.question'] }
  });

  const { loading: loading2 } = useQuery<IQuestion[]>({
    name: 'getQuestions',
    query: GET_MEMBER_DATA_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const loading = loading1 && loading2;

  return (
    <Card className="s-profile-card--membership" show={!loading}>
      <ProfileMembershipHeader />
      <ProfileMembershipContent />
      <ProfileMembershipOnboardingContainer />
    </Card>
  );
};

export default ProfileMembershipCard;
