export const prepareMemberForFilter = (entity: any): Record<string, any> => {
  const data = entity.values?.reduce((acc: Record<string, any>, element) => {
    return { ...acc, [element?.question]: element?.value };
  }, {});

  return data;
};
