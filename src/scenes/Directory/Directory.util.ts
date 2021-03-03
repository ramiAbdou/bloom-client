export const prepareMemberForFilter = (entity): Record<string, any> => {
  const data = entity.data?.reduce((acc: Record<string, any>, element) => {
    return { ...acc, [element?.question]: element?.value };
  }, {});

  return data;
};
