import useBloomMutation from '@gql/useBloomMutation';
import {
  FormItemData,
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { MemberValueInput, UpdateMemberValueArgs } from './Profile.types';

const useUpdateMemberValues = (): OnFormSubmitFunction => {
  const [updateMemberValues] = useBloomMutation<
    IMemberValue[],
    UpdateMemberValueArgs
  >({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: MutationEvent.UPDATE_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { items: { required: true, type: '[MemberValueArgs!]' } }
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const data: MemberValueInput[] = Object.values(items).map(
      (item: FormItemData) => {
        const { questionId, value } = item;
        return { questionId, value: value as string[] };
      }
    );

    const { error } = await updateMemberValues({ items: data });

    // const { error } = await mutate({
    //   client: apolloClient,
    //   fields: [
    //     'facebookUrl',
    //     'id',
    //     'instagramUrl',
    //     'linkedInUrl',
    //     'twitterUrl'
    //   ],
    //   mergeEntities,
    //   mutationName: 'UpdateMemberSocials',
    //   operation: 'updateMemberSocials',
    //   schema: [Schema.MEMBER_SOCIALS],
    //   set: { facebookUrl, instagramUrl, linkedInUrl, twitterUrl },
    //   where: { id: { _eq: db.member.memberSocials } }
    // });

    if (error) {
      setError('Failed to update membership information.');
      return;
    }

    closeModal();
    showToast({ message: 'Membership information updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberValues;
